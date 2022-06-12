const jwt = require("jsonwebtoken");
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

const getTattoosByUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    const { username } = jwt.verify(token, process.env.JWT_SECRET);

    const tattoosByUser = await Tattoo.find({ creator: username });
    if (tattoosByUser.length !== 0) {
      res.status(200).json({ tattoosByUser });
    } else {
      const error = new Error();
      error.customMessage = "No tattoos in the DB";
      error.statusCode = 400;
      next(error);
    }
  } catch {
    const error = new Error();
    error.customMessage = "Request cannot be processed";
    error.statusCode = 400;
    next(error);
  }
};

const getTattooById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tattooById = await Tattoo.findById(id);

    if (tattooById) {
      res.status(200).json({ tattooById });
    } else {
      const error = new Error("Any tattoo with this id has found");
      error.statusCode = 404;
      error.customMessage = "Any tattoo with this id has found";

      next(error);
    }
  } catch {
    const error = new Error("Something went wrong");
    error.statusCode = 404;
    error.customMessage = "Something went wrong";

    next(error);
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
    const { image } = req;

    const newImageBackup = req.imageBackup;
    newTattoo.image = image;
    newTattoo.imageBackup = newImageBackup;
    const createdTattoo = await Tattoo.create(newTattoo);
    res.status(201).json({ createdTattoo });
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
      const updatedTattoo = {
        ...tattoo,
        image: currentTattoo.image,
      };
      await Tattoo.findByIdAndUpdate(id, updatedTattoo);

      res.status(201).json({ updatedTattoo });
    } else {
      const updateTattoo = {
        ...tattoo,
        image: newImage,
      };
      const updatedTattoo = await Tattoo.findByIdAndUpdate(id, updateTattoo, {
        new: true,
      });

      res.status(201).json({ updatedTattoo });
    }
  } catch {
    const error = new Error("Tattoo couldn't be updated");
    error.statusCode = 400;
    error.customMessage = "Tattoo couldn't be updated";
    next(error);
  }
};

module.exports = {
  getTattoos,
  getTattoosByUser,
  getTattooById,
  deleteTattoo,
  createTattoo,
  editTattoo,
};
