require("dotenv").config();
const express = require("express");
const {
  getTattoos,
  deleteTattoo,
} = require("../../controllers/tattoosControllers/tattoosControllers");

const tattoosRouter = express.Router();

tattoosRouter.get("/list", getTattoos);

tattoosRouter.delete("/:id", deleteTattoo);

module.exports = tattoosRouter;
