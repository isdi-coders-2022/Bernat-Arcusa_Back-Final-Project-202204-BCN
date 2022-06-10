require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getTattoos,
  deleteTattoo,
  createTattoo,
  editTattoo,
  getTattoosByUser,
} = require("../../controllers/tattoosControllers/tattoosControllers");
const { auth } = require("../../middlewares/auth/auth");

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: { fileSize: 5000000 },
});

const tattoosRouter = express.Router();

tattoosRouter.get("/list", getTattoos);
tattoosRouter.get("/list/user", auth, getTattoosByUser);
tattoosRouter.delete("/:id", auth, deleteTattoo);
tattoosRouter.post("/newTattoo", auth, upload.single("image"), createTattoo);
tattoosRouter.put("/:id", auth, upload.single("image"), editTattoo);

module.exports = tattoosRouter;
