'use strict';
const {DataTypes} = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
 
await queryInterface.createTable('users',{

  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user')
  },
  profileURL: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
});   
  },

  async down (queryInterface, Sequelize) {
  
   await queryInterface.dropTable('users');
  
  }
};
