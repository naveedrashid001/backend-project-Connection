const { courses: Courses, lectures: Lectures, playlists: Playlists, users: Users } = require("../models");
module.exports = {
    createCourse:
        /////////// create product (add)
        async function (req, res) {
            try {
                const { userid } = req;
                const { role } = req;
                const { title, description, fkuserid, category } = req.body;
                if (fkuserid.length!==Users.id) {
                    return res.status(404).send("fkuserid not found in the database")
                }
                const course = await Courses.create({
                    title,
                    description,
                    fkuserid,
                    category
                });
                res.status(200).send({
                    message: "course add sucessfuly",
                    course,

                });
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    showAllCourses: async (req, res, next) => {
        try {
            const courses = await Courses.findAll();
            res.status(200).send({
                message: "following are all courses",
                courses
            })
        } catch (err) {
            res.status(404).send(err.message || "somewent wrong")
        }
    },
    getCourseLecture:   ////// get lecture with fkcourseid
        async (req, res) => {
            try {
                const { userid } = req;
                const { courseid } = req.body;
                const course = await Courses.findByPk(courseid,
                    {
                        include: [{
                            model: Lectures,
                            as: 'lectures',
                            attributes: ["title", "description"]
                        },
                        ]
                    })
                if (!course) {
                    return res.status(404).send("course not found")
                }
                res.status(200).send(course);
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    addCourseLecture:
        /////////// create lecture course (add)
        async function (req, res,next) {
            try {
                const { userid } = req;
                const { role } = req;
                const { title, fkcourseid, description, videoUrl } = req.body;
                const course =await Courses.findByPk(fkcourseid);
                if (!course) {
                    return res.status(404).send("fkcourseid not found")
                }
                const lecture = await Lectures.create({
                    title,
                    fkcourseid,
                    description,
                    videoUrl
                });
                res.status(200).send({
                    message: "lecture add sucessfuly",
                    lecture,

                });
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
        deleteCourse:
        async (req,res,next)=>{
            try{
                const {user}=req;
                const {role}=req;
                const {courseid}=req.body;
               const course= await Courses.findOne({
                where:{
                    id:courseid,
                }
               });
                if (!course) {
                    return res.status(404).send("courseid not found in the database")
                }
                await course.destroy({
                    where:{
                        id:courseid,
                    }
                });
                res.status(200).send({
                    message:"course deleted sucessfuly",
                    courseid
                });

            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
}