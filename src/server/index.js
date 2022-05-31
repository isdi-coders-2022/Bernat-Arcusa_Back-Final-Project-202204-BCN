const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./routers/usersRouters/usersRouters");
const { generalError, notFoundError } = require("./middlewares/errors/errors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
