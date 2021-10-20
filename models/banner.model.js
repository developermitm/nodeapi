const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        banner: { type: DataTypes.STRING, allowNull: false },
        place: { type: DataTypes.STRING, allowNull: false },
        num: { type: DataTypes.STRING, allowNull: true },
        status : { type: DataTypes.INTEGER, allowNull: true },
        link : { type: DataTypes.STRING, allowNull: true },
        image_ext : { type: DataTypes.STRING, allowNull: true },
        addedBy : { type: DataTypes.STRING, allowNull: true },
        product_id : { type: DataTypes.INTEGER, allowNull: true },
        from_time : { type: DataTypes.STRING, allowNull: true },
        to_time : { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        freezeTableName: true,
        createdAt : 'created_at',
        updatedAt: 'updated_at',
    };

    return sequelize.define('banner', attributes, options);
}