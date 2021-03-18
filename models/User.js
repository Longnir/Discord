const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey:true
        },
        teletravail: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
    }, {
        timestamps: false,
    });

};