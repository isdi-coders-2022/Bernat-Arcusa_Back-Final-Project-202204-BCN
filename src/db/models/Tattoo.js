const { Schema, model, SchemaTypes } = require("mongoose");

const TattooSchema = new Schema({
  image: String,
  creator: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  creationDate: String,
  tags: [String],
});

const Tattoo = model("Tattoo", TattooSchema, "tattoos");

module.exports = Tattoo;
