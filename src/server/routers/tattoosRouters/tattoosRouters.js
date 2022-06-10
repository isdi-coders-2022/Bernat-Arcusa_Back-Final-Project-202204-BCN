require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getTattoos,
  deleteTattoo,
  createTattoo,
} = require("../../controllers/tattoosControllers/tattoosControllers");
const { auth } = require("../../middlewares/auth/auth");

const upload = multer({ dest: path.join("uploads", "images") });

const tattoosRouter = express.Router();

tattoosRouter.get("/list", getTattoos);
tattoosRouter.delete("/:id", auth, deleteTattoo);
tattoosRouter.post("/newTattoo", auth, upload.single("image"), createTattoo);

module.exports = tattoosRouter;
