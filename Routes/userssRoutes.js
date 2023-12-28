const express = require('express');
const router = express.Router();
const userController = require("../controler/usersControler");
const isAuthenticated =require('../middlewares/isAuthenticated')
const isAdmin=require('../middlewares/isAdmin')

////////register accountin website
router.post('/register', userController.register);

/////// login your account
router.post('/login', userController.log_in);

//////  get your profile
router.get('/me/:userid',isAuthenticated, userController.profile);

////// delete your account
router.route('/me/:userid').delete(userController.delete_profile);

/////// account updated sucessfuly
router.route('/update/:userid').put(isAuthenticated,userController.updateProfile);

/////// change your password
router.route('/changePassword/:userid').put(isAuthenticated,userController.changePassword); 

//admin routes get all user
router.route("/admin/users/:userid").get(isAuthenticated, isAdmin, userController.getAllUsers);


//// admain delete user and change user role
router
.route('/admin/user/:userid')
.put(isAuthenticated,isAdmin, userController.updateUserRole)
.delete(isAuthenticated, isAdmin, userController.deleteUser);
// router.route('/admin/user/:userid')
module.exports = router;



///////// first register your in website
////////  then login in website  (to get token)
/////// get your profile  (need id, token,)
/////// get all user (only admin can see)