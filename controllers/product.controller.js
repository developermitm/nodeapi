var productService = require('../services/product.service')    
  
module.exports = {
    getAll,
};

function getAll(req, res, next) {
    productService.getAll(req.query.categoryId)
    .then((products) => res.json(products))
        .catch(next);
}


