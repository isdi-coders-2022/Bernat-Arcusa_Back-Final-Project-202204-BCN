const { Joi } = require("express-validation");

const credentialsRegisterSchema = {
  body: Joi.object({
    username: Joi.string()
      .max(20)
      .messages({ message: "Username is required" })
      .required(),
    password: Joi.string()
      .max(20)
      .messages({ message: "Password is required" })
      .required(),
    fullname: Joi.string()
      .max(50)
      .messages({ message: "Full name is required" })
      .required(),
    email: Joi.string()
      .max(40)
      .messages({ message: "E-mail is required" })
      .required(),
  }),
};

module.exports = credentialsRegisterSchema;
