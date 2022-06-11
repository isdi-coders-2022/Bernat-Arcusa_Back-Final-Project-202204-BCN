const { Schema, model, SchemaTypes } = require("mongoose");

const TattooSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageBackup: String,
  creator: {
    type: SchemaTypes.String,
    ref: "User",
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
  tags: [String],
});

const Tattoo = model("Tattoo", TattooSchema, "tattoos");

module.exports = Tattoo;
