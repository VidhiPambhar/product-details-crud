const jwt = require("jsonwebtoken");
const  User  = require("../models/User");

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "token");
    console.log(decodedToken, "decodedToken");
    const user = await User.findOne({
      where: {
        email: decodedToken.email,
      },
      raw: true,
      nest: true,
    });
    console.log(user, "user");
    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};