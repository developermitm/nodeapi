const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize, QueryTypes } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password,{host: host, dialect: 'mysql' , port: 3307, logging: false});

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Category = require('../models/category.model')(sequelize);
    db.Product = require('../models/product.model')(sequelize);
    db.Banner = require('../models/banner.model')(sequelize);
    db.Offer = require('../models/offer.model')(sequelize);
    db.Coupon = require('../models/coupon.model')(sequelize);
    db.Addon = require('../models/addon.model')(sequelize);
    // db.SubCategory = require('../models/subcategory.model')(sequelize);
    
    // One to One Relationship
    // db.SubCategory.belongsTo(db.Category,{
    //     foreignKey: {
    //         name: 'category_id'
    //     }
    // })
    // // One to Many Relationship
    // db.Category.hasMany(db.SubCategory, {
    //     foreignKey: 'category_id'
    // });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    await sequelize.sync();
}