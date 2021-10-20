const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('./user.service');

// routes
router.post('/login', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.post('/verify-otp', optVerification, verifyotp);
router.post('/resend-otp', registerSchema, resendOTP);
router.get('/', authorize(), getAll);
router.get('/userdetails', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        mobile_no: Joi.number().min(10).required(),
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    const device_id =  req.headers['device-id']; 
    const device_type = req.headers['device-type']; 
    const user_otp = Math.floor(Math.random() * 900000);
    userService.authenticate(Object.assign({device_id : device_id ,device_type : device_type, user_otp : user_otp }, req.body)) 
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        mobile_no: Joi.number().min(10).required(),
    });
    validateRequest(req, next, schema);
}

function optVerification(req, res, next){
    const schema = Joi.object({
        mobile_no: Joi.number().min(10).required(),
        otp: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function verifyotp(req, res, next){
    userService.verifyotp(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function resendOTP(req, res, next){
    const user_otp = Math.floor(Math.random() * 900000);
    userService.resendOTP(Object.assign({ user_otp : user_otp }, req.body))
    .then(message => res.json(message))
    .catch(next);
}

function register(req, res, next) {
    const user_otp = Math.floor(Math.random() * 900000);
    userService.create(Object.assign({ user_otp : user_otp }, req.body))
        .then(() => res.json({ message: 'Registration successful', otp : user_otp }))
        .catch(next);
}


function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}