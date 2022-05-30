const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { generalError } = require("./middlewares/errors/errors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use(generalError);

module.exports = app;
