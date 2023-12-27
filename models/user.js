const sequelize = require("./index");
const { DataTypes } = require('sequelize');
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user')
        },profileURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue:2023,
        },
        updatedAt:{
            type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue:2023,
        }
    });

    User.beforeCreate((user)=>{
        user.dataValues.createdAt = moment().unix();
        user.dataValues.updatedAt = moment().unix();
      });
      User.beforeUpdate((user)=>{
        user.dataValues.updatedAt = moment().unix();
});

    User.associate = (models) => {
        User.hasMany(models.courses, { foreignKey: 'fkuserid', as: 'courses' });
        User.hasMany(models.playlists, { foreignKey: 'fkuserid', as: 'playlists' });
    };

    return User;
};
