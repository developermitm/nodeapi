const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        username: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        mobile_no: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: true },
        address:{ type: DataTypes.STRING, allowNull: true},
        city:{ type: DataTypes.STRING, allowNull: true},
        zip:{ type: DataTypes.STRING, allowNull: true},
        langlat:{ type: DataTypes.STRING, allowNull: true},
        profile_pic:{ type: DataTypes.STRING, allowNull: true},
        wishlist:{ type: DataTypes.STRING, allowNull: true},
        last_login:{ type: DataTypes.STRING, allowNull: true},
        country:{ type: DataTypes.STRING, allowNull: true},
        state:{ type: DataTypes.STRING, allowNull: true},
        wallet:{ type: DataTypes.STRING, allowNull: true},
        user_otp:{ type: DataTypes.STRING, allowNull: true},
        gender:{ type: DataTypes.STRING, allowNull: true},
        dob:{ type: DataTypes.STRING, allowNull: true},
        device_token:{ type: DataTypes.STRING, allowNull: true},
        device_id:{ type: DataTypes.INTEGER, allowNull: true},
        device_type:{ type: DataTypes.INTEGER, allowNull: true},
        is_verify:{ type: DataTypes.INTEGER, allowNull: true},
        status : { type: DataTypes.INTEGER, allowNull: true},
    };

    const options = {
        freezeTableName: true,
        createdAt : 'created_at',
        updatedAt: 'updated_at',
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('user', attributes, options);
}