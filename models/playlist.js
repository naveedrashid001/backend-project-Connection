const sequelize=require("./index");
const {DataTypes} = require('sequelize');
const moment=require("moment");
module.exports=(sequelize,DataTypes)=>{
  const Playlist = sequelize.define('playlists', {

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
Playlist.beforeCreate((playlist)=>{
    playlist.dataValues.createdAt=moment().unix();
    playlist.dataValues.updatedAt = moment().unix();
});
Playlist.beforeUpdate((playlist) => {
  playlist.dataValues.updated = moment().unix();
})

Playlist.associate = (models) => {
  Playlist.belongsTo(models.users, { foreignKey: 'fkuserid', as: 'user' });
  Playlist.belongsTo(models.courses, { foreignKey: 'fkcourseid', as: 'course' });
  // Playlist.hasMany(models.courses, { foreignKey: 'fkcourseid', as: 'courses' });
};

return Playlist;
}