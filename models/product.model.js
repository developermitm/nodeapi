const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: true },
        added_by: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.INTEGER, allowNull: true },
        description: { type: DataTypes.STRING, allowNull: true },
        sale_price: { type: DataTypes.STRING, allowNull: true },
        purchase_price: { type: DataTypes.STRING, allowNull: true },
        shipping_cost: { type: DataTypes.STRING, allowNull: true },
        featured: { type: DataTypes.STRING, allowNull: true },
        tag: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.INTEGER, allowNull: true },
        front_image: { type: DataTypes.STRING, allowNull: true },
        current_stock: { type: DataTypes.INTEGER, allowNull: true },
        additional_fields: { type: DataTypes.STRING, allowNull: true },
        number_of_view: { type: DataTypes.STRING, allowNull: true },
        discount: { type: DataTypes.STRING, allowNull: true },
        discount_type: { type: DataTypes.STRING, allowNull: true },
        main_image: { type: DataTypes.STRING, allowNull: true },
        num_of_imgs: { type: DataTypes.INTEGER, allowNull: true },

    };

    const options = {
        freezeTableName: true,
        createdAt : 'created_at',
        updatedAt: 'updated_at',
    };


    return sequelize.define('product', attributes, options);
}