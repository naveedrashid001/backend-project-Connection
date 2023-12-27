// const { users:Users} = require("../models");
const { lectures: Lectures, courses: Courses } = require("../models");
module.exports = {
        deleteLecture:
        async (req,res,next)=>{
            try{
                const {user}=req;
                const {role}=req;
                const {lectureId}=req.body;
               const lectureid= await Lectures.findByPk(lectureId);
                if (!lectureid) {
                    return res.status(404).send("lectureid not found in the database")
                }
                await Lectures.destroy({
                    where:{
                        id:lectureId,
                    }
                });
                res.status(200).send({
                    message:"Lecture deleted sucessfuly",
                    lectureId
                });

            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        }
}