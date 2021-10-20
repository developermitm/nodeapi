const db = require('_helpers/db');
const { QueryTypes } = require('sequelize');
module.exports = {
    getAll,
};

async function getAll() {
    //return await db.sequelize.query("SELECT * FROM `categories`", { type: QueryTypes.SELECT });
    const categories =  await db.Category.findAll({
        attributes: ['id','category_name', 'description', 'category_order', 'category_image','status']
    });

    if(categories.length > 0){
        const successData = { 'status' : 'success', "status_code": 200, "message": "found", "data" : categories, 'image_url' : appUrl }
        return successData;
    }else{
        const data = {};
        const successData = {'status' : 'success', "status_code": 200,"message": "No record found", "data" : data }
        return successData;
    }
}
