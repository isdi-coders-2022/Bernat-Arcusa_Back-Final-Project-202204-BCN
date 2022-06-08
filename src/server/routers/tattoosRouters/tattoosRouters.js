require("dotenv").config();
const express = require("express");
const {
  getTattoos,
  deleteTattoo,
} = require("../../controllers/tattoosControllers/tattoosControllers");
const { auth } = require("../../middlewares/auth/auth");

const tattoosRouter = express.Router();

tattoosRouter.get("/list", getTattoos);

tattoosRouter.delete("/:id", auth, deleteTattoo);

module.exports = tattoosRouter;
