const { secret } = require("../constant");
const { users: Users,playlists: Playlists } = require("../models");
const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
        try {
            const { userid } = req.params;
            const user = await Users.findByPk(userid);
            if (!user) {
                return res.status(409).send("user not found in database")
            }
            const token = req.header("Authorization")
            if (!token) {
                return res.status(409).send("you are not Authorization token is required")
            }
            const decodedtoken = await jwt.verify(token, secret)
            if (!decodedtoken) {
                return res.status(409).send("invalid token")
            }
            console.log(user.id, decodedtoken.id)
            if (user.id !== decodedtoken.id) {
                return res.status(409).send("you are not Authoriz to use this profile change your profile id")
            }
            req.user = user;
            next();
        } catch (err) {
            console.log(err)
        }
    }
