const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
};

async function getAll() {
    const banner =  await db.Banner.findAll({
        attributes: ['id','image_ext','link', 'num', 'from_time' ],
        order: [["id", "DESC"]],
        limit : 5,
        
      });
    if(banner.length > 0){
        const successData = { 'status' : 'success', "status_code": 200, "message": "found", "data" : banner, 'image_url' : bannerUrl }
        return successData;
    }else{
        const data = {};
        const successData = {'status' : 'success', "status_code": 200,"message": "No record found", "data" : data }
        return successData;
    }
  
}

