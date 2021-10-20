var express = require('express');
var router = express.Router();
var OfferController = require('../controllers/offer.controller')
router.get('/', OfferController.getAll)
module.exports = router;