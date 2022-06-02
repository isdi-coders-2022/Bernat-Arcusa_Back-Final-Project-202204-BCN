const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  added: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Tattoo",
      default: [],
    },
  ],
  favourites: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Tattoo",
      default: [],
    },
  ],
});

const User = model("User", UserSchema, "users");

module.exports = User;
