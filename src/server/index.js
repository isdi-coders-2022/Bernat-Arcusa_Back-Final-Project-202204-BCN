const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const usersRouter = require("./routers/usersRouters/usersRouters");
const { generalError, notFoundError } = require("./middlewares/errors/errors");
const tattoosRouter = require("./routers/tattoosRouters/tattoosRouters");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(helmet());

app.use("/users", usersRouter);
app.use("/tattoos", tattoosRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
