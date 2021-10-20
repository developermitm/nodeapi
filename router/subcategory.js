var express = require('express');
var router = express.Router();
const Joi = require('joi');
const authorize = require('_middleware/authorize')
const validateRequest = require('_middleware/validate-request');
var SubCategoryController = require('../controllers/subcategory.controller')

function registerSchema(req, res, next) {
    const schema = Joi.object({
        subcat_name: Joi.string().required(),
        subcat_thumbnail: Joi.string().required(),
        category_id: Joi.integer().required(),
    });
    validateRequest(req, next, schema);
}

router.get('/', authorize(), SubCategoryController.getAll)
router.post('/add', authorize(),registerSchema,SubCategoryController.addSubCategory)
module.exports = router;