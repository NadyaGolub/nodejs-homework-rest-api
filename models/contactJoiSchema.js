const Joi = require("joi");


const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  email: Joi.string()
    .required()
    .messages({ "any.required": `missing required name field` }),
  phone: Joi.string()
    .required()
        .messages({ "any.required": `missing required name field` }),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const schemas = {
    contactAddSchema,
    favoriteSchema,
}

module.exports = {schemas};