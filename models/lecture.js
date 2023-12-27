const sequelize=require("./index");
const {DataTypes} = require('sequelize');
const moment=require("moment");
module.exports=(sequelize,DataTypes)=>{
  const Lecture = sequelize.define('lectures', {

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
    fkcourseid:{
        type: DataTypes.INTEGER,
      },
    description:{
        type: DataTypes.STRING,
      allowNull: false
    },
    videoUrl:{
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
Lecture.beforeCreate((lecture)=>{
    lecture.dataValues.createdAt=moment().unix();
    lecture.dataValues.updatedAt=moment().unix();
});
Lecture.beforeUpdate((lecture)=>{
    lecture.dataValues.updated=moment().unix();
})


Lecture.associate = (models) => {
  Lecture.belongsTo(models.courses, { foreignKey: 'fkcourseid', as: 'course' });
};

return Lecture;
}