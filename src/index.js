const initializeServer = require("./server/initializeServer");

const port = process.env.PORT ?? 5000;

initializeServer(port);
