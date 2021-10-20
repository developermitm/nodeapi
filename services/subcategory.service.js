const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    create,
};

async function getAll() {
    return await db.SubCategory.findAll({
        include : db.Category,
        attributes: ['subcat_name', 'subcat_thumbnail', 'category_id']
      });
}

async function create(params) {
    // validate
    if (await db.SubCategory.findOne({ where: { subcat_name: params.subcat_name } })) {
        throw 'SubCategory Name "' + params.subcat_name + '" is already taken';
    }
    // save Category
    if(await db.SubCategory.create(params)){
        throw 'Category saved successfully';
    }
}
