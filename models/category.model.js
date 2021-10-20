const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        category_name: { type: DataTypes.STRING, allowNull: false },
        category_image: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        category_order : { type: DataTypes.INTEGER, allowNull: true },
        status : { type: DataTypes.INTEGER, allowNull: true },
    };

    const options = {
        freezeTableName: true,
        createdAt : 'created_at',
        updatedAt: 'updated_at',
    };

    return sequelize.define('category', attributes, options);
}