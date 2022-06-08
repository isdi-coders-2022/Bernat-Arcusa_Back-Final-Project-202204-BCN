require("dotenv").config();
const jwt = require("jsonwebtoken");
const debug = require("debug")("gamersland:server:middlewares:auth");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.replace("Bearer ", "");
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    debug("User authenticated correctly");
    next();
  } catch (error) {
    error.statusCode = 401;
    error.customMessage = "Invalid authentication";
    next(error);
  }
};

module.exports = { auth };
