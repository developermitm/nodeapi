var subcategoryService = require('../services/subcategory.service')    
  
module.exports = {
    getAll,
    addSubCategory,
};

function getAll(req, res, next) {
    subcategoryService.getAll()
        .then(subcategories => res.json(subcategories))
        .catch(next);
}

function addSubCategory(req, res, next,){
    subcategoryService.create(req.body)
    .then(user => res.json(user))
    .catch(next);
}

