const express=require('express')
const router=express.Router();
const lecturesControler=require("../controler/lecturesControler")
const isAuthenticated=require('../middlewares/isAuthenticated');
const isAdmin=require('../middlewares/isAdmin');


//delete lecture
router.route("/:userid/lecture").delete(isAuthenticated, isAdmin,lecturesControler.deleteLecture);
module.exports=router;