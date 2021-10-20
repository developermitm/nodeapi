var express = require('express');
var router = express.Router();
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const validateRequest = require('_middleware/validate-request');
var CategoryController = require('../controllers/category.controller')
router.get('/', CategoryController.getAll)
module.exports = router;