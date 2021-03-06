require("dotenv").config();
const debug = require("debug")("tootattoo:server:middlewares:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.customMessage || error.message));
  const message = error.customMessage ?? "Server error";
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ message });
};

module.exports = { generalError, notFoundError };
