var bannerService = require('../services/banner.service')    
  
module.exports = {
    getAll
};

function getAll(req, res, next) {
    bannerService.getAll()
    .then((categories) => res.json(categories))
        .catch(next);
}



