const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
};

async function getAll(param) {
   
    const products =  await db.Product.findAll({
        attributes: ['id','title', 'category', 'description', 'sale_price', 
        'purchase_price', 'shipping_cost','featured', 'tag','status','front_image','current_stock',
        'additional_fields','number_of_view', 'discount','discount_type','main_image','num_of_imgs',
        ],
        where: {
            category: param
          }
      });
    if(products.length > 0){
        const successData = { 'status' : 'success', "status_code": 200, "message": "found", "data" : products, 'image_url' : productUrl }
        return successData;
    }else{
        const data = {};
        const successData = {'status' : 'success', "status_code": 200,"message": "No record found", "data" : data }
        return successData;
    }
  
}

