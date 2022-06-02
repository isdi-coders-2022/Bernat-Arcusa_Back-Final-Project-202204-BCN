require("dotenv").config();
const { validate } = require("express-validation");
const express = require("express");
const {
  userLogin,
  userRegister,
} = require("../../controllers/usersControllers/usersControllers");
const credentialsRegisterSchema = require("../../schemas/userCredentialsSchema");

const usersRouter = express.Router();

usersRouter.post("/login", userLogin);

usersRouter.post(
  "/register",
  validate(credentialsRegisterSchema),
  userRegister
);

module.exports = usersRouter;
