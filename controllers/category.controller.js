var categoryService = require('../services/category.service')    
  
module.exports = {
    getAll
};

function getAll(req, res, next) {
    categoryService.getAll()
    .then((categories) => res.json(categories))
        .catch(next);
}



