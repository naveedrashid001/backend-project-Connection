'use strict';
const {DataTypes} = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
 
await queryInterface.createTable('courses', {

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  title:{
      type: DataTypes.STRING,
    allowNull: false
  },
  description:{
      type: DataTypes.STRING,
    allowNull: false
  },
  fkuserid:{
    type: DataTypes.INTEGER,
  },
  category:{
      type: DataTypes.STRING,
    allowNull: false
  },
  createdAt:{
      type: DataTypes.INTEGER,
    allowNull: false
  },
  updatedAt:{
      type: DataTypes.INTEGER,
    allowNull: false
  }
});
   
  },

  async down (queryInterface, Sequelize) {
  
   await queryInterface.dropTable('courses');
  
  }
};
