const { users: Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await Users.findByPk(userid);

    if (!user) {
      return res.status(404).send("User not found in the database");
    }

    if (user.role !== "admin") {
      return res.status(403).send("User does not have admin role");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
