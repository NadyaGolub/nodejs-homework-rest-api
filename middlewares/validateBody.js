const { HttpError } = require("../helpers");

const valideteBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
     return next(new HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = valideteBody;
