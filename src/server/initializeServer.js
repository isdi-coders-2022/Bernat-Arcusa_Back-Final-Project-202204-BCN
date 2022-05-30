require("dotenv").config();
const debug = require("debug")("tootattoo:server:initializeServer");
const chalk = require("chalk");
const app = require("./index");

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on port ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug(chalk.red("Error on server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} already in use`));
        reject();
      }
    });
  });

module.exports = initializeServer;
