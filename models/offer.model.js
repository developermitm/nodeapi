const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        spec: { type: DataTypes.STRING, allowNull: false },
        added_by: { type: DataTypes.STRING, allowNull: true },
        till : { type: DataTypes.STRING, allowNull: true },
        code : { type: DataTypes.STRING, allowNull: true },
        status : { type: DataTypes.INTEGER, allowNull: true },
    };

    const options = {
        freezeTableName: true,
        createdAt : 'created_at',
        updatedAt: 'updated_at',
    };

    return sequelize.define('offers', attributes, options);
}