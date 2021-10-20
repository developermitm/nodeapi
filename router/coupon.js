var express = require('express');
var router = express.Router();
var CouponController = require('../controllers/coupon.controller')
router.get('/', CouponController.getAll)
module.exports = router;