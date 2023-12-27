const { users: Users } = require("../models");
const jwt = require("jsonwebtoken")
const { secret } = require("../constant");
module.exports = async (req, res, next) => {
        try {
            const role = req.body.role;
            const userRole = await Users.findOne({
                where: {
                    role: 'admin', 
                },
            });
            if (!userRole) {
                return res.status(409).send("Only Admin can acess all user");
            }
            req.role = role;
            next();
        } catch (err) {
            console.log(err);
        }
}