const express=require('express')
const router=express.Router();
const coursesControler=require("../controler/coursesControler")
const isAuthenticated=require('../middlewares/isAuthenticated');
const isAdmin=require('../middlewares/isAdmin');

//  get all courses
router.route('/courses').get(coursesControler.showAllCourses);

//// admin create course
router
 .route("/:userid/createcourse") 
 .post(isAuthenticated, isAdmin, coursesControler.createCourse);

 /// admin get course lectures, add course lectures and delete course
router
.route("/:userid/course")
.get(isAuthenticated, coursesControler.getCourseLecture)
.post(isAuthenticated, isAdmin, coursesControler.addCourseLecture)
.delete(isAuthenticated, isAdmin, coursesControler.deleteCourse);

module.exports=router;