const debug = require("debug")("tootattoo:server:tattoocontrollers");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const Tattoo = require("../../../db/models/Tattoo");

const getTattoos = async (req, res, next) => {
  const tattoos = await Tattoo.find();

  if (tattoos.length === 0) {
    const error = new Error("No tattoos found");
    error.statusCode = 404;
    error.customMessage = "No tattoos found";

    next(error);
  } else {
    res.status(200).json({ tattoos });
  }
};

const deleteTattoo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTattoo = await Tattoo.findByIdAndDelete(id);

    if (deletedTattoo) {
      res.status(200).json({ message: "Tattoo has been deleted" });
    } else {
      const error = new Error("Any tattoo to delete has found");
      error.statusCode = 404;
      error.customMessage = "Any tattoo to delete has found";

      next(error);
    }
  } catch {
    const error = new Error("Any tattoo to delete received");
    error.statusCode = 404;
    error.customMessage = "Any tattoo to delete received";

    next(error);
  }
};

const createTattoo = async (req, res, next) => {
  try {
    const newTattoo = req.body;
    const { file } = req;
    if (file) {
      const newImageName = file ? `${Date.now()}${file.originalname}` : "";

      fs.rename(
        path.join("uploads", "images", file.filename),
        path.join("uploads", "images", newImageName),
        (error) => {
          if (error) {
            debug(chalk.red("Error renaming image on tattoo create"));
            next(error);
          }
        }
      );
      newTattoo.image = newImageName;
    }

    const createdTattoo = await Tattoo.create(newTattoo);
    res.status(200).json({ createdTattoo });
  } catch {
    const error = new Error("Tattoo couldn't be created");
    error.statusCode = 400;
    error.customMessage = "Tattoo couldn't be created";

    next(error);
  }
};

const editTattoo = async (req, res, next) => {
  const tattoo = req.body;
  const { id } = req.params;
  const { file } = req;
  const currentTattoo = await Tattoo.findById(id);
  const newImage = req.image;
  try {
    if (!file) {
      const updateTattoo = {
        ...tattoo,
        image: currentTattoo.image,
        imageBackup: currentTattoo.imageBackup,
      };
      await Tattoo.findByIdAndUpdate(id, updateTattoo);

      res.status(201).json({
        message: "Tattoo updated",
      });
    } else {
      const updateTattoo = {
        ...tattoo,
        image: newImage,
      };
      const updatedTattoo = await Tattoo.findByIdAndUpdate(id, updateTattoo);

      res.status(201).json({ updatedTattoo });
    }
  } catch {
    const error = new Error("Tattoo couldn't be updated");
    error.statusCode = 400;
    error.customMessage = "Tattoo couldn't be updated";
    next(error);
  }
};

module.exports = { getTattoos, deleteTattoo, createTattoo, editTattoo };
