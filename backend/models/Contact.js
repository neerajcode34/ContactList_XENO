const mongoose = require("mongoose");
const Joi = require("joi");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  phone: {
    type: Number,
    required: [true, "phone number is required."],
  },
  email: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    phone: Joi.number().min(7).max(100000000000).required(),
    email: Joi.string().email(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};
