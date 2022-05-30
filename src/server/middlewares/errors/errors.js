require("dotenv").config();
const debug = require("debug")("tootattoo:server:middlewares:errors");
const chalk = require("chalk");

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.message || error.customMessage));
  const message = error.customMessage ?? "Server error";
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ error: true, message });
};

module.exports = { generalError };
