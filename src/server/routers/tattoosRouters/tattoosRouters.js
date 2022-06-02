require("dotenv").config();
const express = require("express");
const getTattoos = require("../../controllers/tattoosControllers/tattoosControllers");

const tattoosRouter = express.Router();

tattoosRouter.post("/list", getTattoos);

module.exports = tattoosRouter;
