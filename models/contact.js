const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers"); 



const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
  },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
},
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

// const contactAddSchema = Joi.object({
//   name: Joi.string()
//     .required()
//     .messages({ "any.required": `missing required name field` }),
//   email: Joi.string()
//     .required()
//     .messages({ "any.required": `missing required name field` }),
//   phone: Joi.string()
//     .required()
//         .messages({ "any.required": `missing required name field` }),
//   favorite: Joi.boolean(),
// });

// const favoriteSchema = Joi.object({
//   favorite: Joi.boolean()
//     .required()
//     .messages({ "any.required": "missing field favorite" }),
// });

// const schemas = {
//     contactAddSchema,
//     favoriteSchema,
// }

const Contact = model("contact", contactSchema);

module.exports = {
    Contact
};