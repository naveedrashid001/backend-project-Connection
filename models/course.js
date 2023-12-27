const sequelize=require("./index");
const {DataTypes} = require('sequelize');
const moment=require("moment");
module.exports=(sequelize,DataTypes)=>{
  const Course = sequelize.define('courses', {

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
Course.beforeCreate((course)=>{
    course.dataValues.createdAt=moment().unix();
    course.dataValues.updatedAt=moment().unix();
});
Course.beforeUpdate((course)=>{
    course.dataValues.updated=moment().unix();
})

Course.associate = (models) => {
  Course.belongsTo(models.users, { foreignKey: 'fkuserid', as: 'user'});
  Course.hasMany(models.lectures, { foreignKey: 'fkcourseid', as: 'lectures' });
  Course.hasMany(models.playlists, { foreignKey: 'fkcourseid', as: 'playlists' });
};


return Course;
}