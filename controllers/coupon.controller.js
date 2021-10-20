var couponService = require('../services/coupon.service')    
  
module.exports = {
    getAll
};

function getAll(req, res, next) {
    couponService.getAll()
    .then((categories) => res.json(categories))
        .catch(next);
}



