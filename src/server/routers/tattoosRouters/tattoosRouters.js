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
  getTattooById,
} = require("../../controllers/tattoosControllers/tattoosControllers");
const { auth } = require("../../middlewares/auth/auth");
const firebaseUpload = require("../../middlewares/firebaseUpload/firebaseUpload");

const upload = multer({
  dest: path.join("uploads", "images"),
  limits: { fileSize: 5000000 },
});

const tattoosRouter = express.Router();

tattoosRouter.get("/list", getTattoos);
tattoosRouter.get("/list/user", auth, getTattoosByUser);
tattoosRouter.get("/:id", getTattooById);
tattoosRouter.delete("/:id", auth, deleteTattoo);
tattoosRouter.post(
  "/newTattoo",
  auth,
  upload.single("image"),
  firebaseUpload,
  createTattoo
);
tattoosRouter.put(
  "/:id",
  auth,
  upload.single("image"),
  firebaseUpload,
  editTattoo
);

module.exports = tattoosRouter;
