var express = require('express');
var router = express.Router();
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const validateRequest = require('_middleware/validate-request');
var ProductController = require('../controllers/product.controller')
router.get('/', ProductController.getAll)
module.exports = router;