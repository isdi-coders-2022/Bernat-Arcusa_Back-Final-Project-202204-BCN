require("dotenv").config();
const debug = require("debug")("tootattoo:server:users");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../../db/models/User");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    debug(chalk.red("Username is wrong"));
    const error = new Error("Incorrect username");
    error.statusCode = 403;
    error.customMessage = "Username or password are wrong";
    next(error);
  }
  const userData = {
    username: user.username,
  };
  const actualPassword = await bcrypt.compare(password, user.password);

  if (!actualPassword) {
    debug(chalk.red("Password is wrong"));
    const error = new Error("Incorrect password");
    error.statusCode = 403;
    error.customMessage = "Username or password are wrong";
    next(error);
  } else {
    const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);
    res.status(200).json(token);
  }
};

const userRegister = async (req, res) => {
  const { username, password, fullname, email } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      fullname,
      email,
      password: encryptedPassword,
    };

    await User.create(newUser);

    res.status(201).json({ newUser: username });
  }
};

module.exports = { userLogin, userRegister };
