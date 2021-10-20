var express = require('express');
var router = express.Router();
var BannerController = require('../controllers/banner.controller')
router.get('/', BannerController.getAll)
module.exports = router;