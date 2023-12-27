'use strict';
const {DataTypes} = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
 
await queryInterface.createTable('playlists', {

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement:true,
    primaryKey:true
  },
  fkuserid:{
    type: DataTypes.INTEGER,
  },
  fkcourseid:{
      type: DataTypes.STRING,
    allowNull: false
  },
  createdAt:{
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
  
   await queryInterface.dropTable('playlists');
  
  }
};
