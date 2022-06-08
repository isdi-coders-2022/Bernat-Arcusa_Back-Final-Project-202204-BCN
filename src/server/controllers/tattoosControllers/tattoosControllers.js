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
    const { title, image, creator, creationDate, tags } = req.body;

    const newTattoo = { title, image, creator, creationDate, tags };

    await Tattoo.create(newTattoo);
    res.status(200).json({ newTattoo });
  } catch {
    const error = new Error("Tattoo couldn't be created");
    error.statusCode = 400;
    error.customMessage = "Tattoo couldn't be created";

    next(error);
  }
};

module.exports = { getTattoos, deleteTattoo, createTattoo };
