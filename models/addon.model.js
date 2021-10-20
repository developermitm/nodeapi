const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        category_id: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        addon_desc: { type: DataTypes.STRING, allowNull: true },
        qty : { type: DataTypes.INTEGER, allowNull: true },
        status : { type: DataTypes.INTEGER, allowNull: true },
        price : { type: DataTypes.INTEGER, allowNull: true },
        addon_image : { type: DataTypes.INTEGER, allowNull: true },
    };

    const options = {
        freezeTableName: true,
        createdAt : 'created_at',
        updatedAt: 'updated_at',
    };

    return sequelize.define('addon_product', attributes, options);
}