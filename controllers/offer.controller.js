var offerService = require('../services/offer.service')    
  
module.exports = {
    getAll
};

function getAll(req, res, next) {
    offerService.getAll()
    .then((categories) => res.json(categories))
        .catch(next);
}



