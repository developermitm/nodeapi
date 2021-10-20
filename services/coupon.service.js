const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
    getAll,
};

async function getAll() {
    const coupon =  await db.Coupon.findAll({
        attributes: ['id', 'title', 'till', 'code'],
        where:{ 
            till: {
                [Op.gte]: '2021-10-22'
            }
        }
      });
    if(coupon.length > 0){
        const successData = { 'status' : 'success', "status_code": 200, "message": "found", "data" : coupon }
        return successData;
    }else{
        const data = {};
        const successData = {'status' : 'success', "status_code": 200,"message": "No record found", "data" : data }
        return successData;
    }
  
}

