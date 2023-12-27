
const { users: Users, courses: Courses, playlists: Playlists, sequelize } = require("../models");
const bycrpt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const userAthentication = require('../middlewares/isAuthenticated')
const { secret } = require("../constant");
module.exports = {
    register:
        /////////// register your account
        async function (req, res) {
            try {
                const { name, email, password, role, profileURL } = req.body;
                if (!name || !email || !password) {
                    return res.status(409).send("required field canot be empty")
                }
                let user = await Users.findOne({
                    where: {
                        email
                    }
                })
                if (user) {
                    return res.status(409).send("email already exist")
                }
                if (password.length < 8) {
                    return res.status(409).send("Password must be at least 8 characters long");
                }
                const hashpassword = await bycrpt.hash(password, 12);
                user = await Users.create({
                    name,
                    email,
                    password: hashpassword,
                    role,
                    profileURL
                })
                console.log(user);
                res.status(200).send({
                    message: "user sign_in sucessfuly",
                    user,

                });

            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    singleUser:   ////// get single user from the database
        async function (req, res) {
            try {
                let { userid } = req.params;
                userid = Number(userid);
                const user = await Users.findByPk(userid, {
                    include: [{
                        model: Courses,
                        as: 'courses',
                        attributes: ["id", "title"]
                    }, {
                        model: Playlists,
                        as: 'playlists',
                        attributes: ["id"]
                    },]
                }
                );
                if (!user) {
                    return res.status(409).send("userid isent avalible")
                }
                res.status(200).send("single user");

            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },

    log_in:  //////// login account
        async function (req, res, next) {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(409).send("required field canot be empty")
                }
                let user = await Users.findOne({
                    where: {
                        email,
                    }
                })
                if (!user) {
                    return res.status(404).send("please first register then login your account")
                }
                const comparepassword = await bycrpt.compare(password, user.password);
                if (!comparepassword) {
                    return res.status(401).send("incorrect password")
                }
                user = await user.toJSON();
                const token = jwt.sign(user, secret);
                res.status(201).send({
                    message: "customer log_in sucessfuly",
                    user,
                    token,

                });


            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    profile: ////// get your profile
        async function (req, res, next) {
            try {
                const { user } = req;
                res.status(201).send({
                    message: "welcome to your profile",
                    user,
                });
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong !")
            }
        },
    delete_profile: //////// delete your account
        async function (req, res, next) {
            try {
                const { userid } = req.params;
                const user = await Users.findByPk(userid);
                if (!user) {
                    return res.status(409).send("user id isn't found in the database")
                }
                await Users.destroy({
                    where: {
                        id: userid
                    }
                });
                res.status(201).send("account delete sucessfuly");
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    updateProfile:
        async function (req, res, next) {
            try {
                const { user } = req;
                const { name, email, password, role } = req.body;
                if (!name || !email) {
                    return res.status(409).send("required field can't be empty");
                }
                const hashpassword = await bycrpt.hash(password, 12);
                // const updatedDate = new Date().toISOString().slice(0, 10);
                const updatedUser = await user.update({
                    name,
                    email,
                    password: hashpassword,
                    role,

                }, {
                    where: {
                        // id: userid
                        id: req.user.id
                    }
                });
                res.status(201).send({
                    message: "profile updated sucessfuly",
                    updatedUser,
                });
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    changePassword:
        async function (req, res, next) {
            try {
                const { user } = req;
                const { password } = req.body;
                if (!password) {
                    return res.status(409).send("please change your password..!! send it in req.body");
                }
                const hashpassword = await bycrpt.hash(password, 12);
                const updatedUser = await user.update({
                    password: hashpassword,
                    // password   ///// i have commentOut hashPassword and cheek it.! it work sucessfuly !!!
                }, {
                    where: {
                        id: user.id
                    },
                    // fields: ['password']
                });
                res.status(201).send({
                    message: "password changed sucessfuly",
                    updatedUser,
                });
            } catch (err) {
                console.log(err);
                res.status(404).send(err.message || "somewent wrong")
            }
        }, getAllUsers:
        async (req, res, next) => {
            try {
                const { user } = req;
                const { role } = req;
                const alluser = await Users.findAll({
                    attributes: ["id", "name", "email"]
                });
                res.status(200).send({
                    message: "following are all user in the database",
                    alluser,
                })
            } catch (err) {
                res.status(404).send(err.message || "somewent wrong")
            }
        },
    updateUserRole: async function (req, res, next) {
        try {
            const { user } = req;
            const { role } = req;
            const { userRole } = req.body;
            const updatedUser = await Users.update({
                role,
            }, {
                where: {
                    id: userRole,
                }
            }
            );
            if(userRole!==Users.id){
                return res.status(404).send("userId not found in database")
            }
            res.status(200).send({
                message: "User role updated sucessfully",
                updatedUser: role,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    },
    ///////// adimin deleted user 
    deleteUser: async function (req, res, next) {
        try {
            const { user } = req;
            const { role } = req;
            const { userId } = req.body;
            const userid= await Users.findByPk(userId);
                if (!userid) {
                    return res.status(404).send("user id not found. which you want to delete")
                }
            await Users.destroy({
                where: {
                    id: userId,
                }
            } );
            
            res.status(200).send({
                message: "User deleted sucessfully",
                userId,
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
    },
}



