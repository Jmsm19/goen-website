const Joi = require('joi');

const returnErrorOrNext = (error, res, next) => {
  if (error) {
    return res.status(400).send({
      key: error.details[0].context.key,
      error: error.details[0].message,
    });
  }
  return next();
};

module.exports = {
  signup(req, res, next) {
    const schema = {
      name: Joi.string().required(),
      nationalId: Joi.string()
        .regex(/^[0-9]{7,}$/i)
        .required(),
      phoneNumber: Joi.string()
        .regex(/^[0-9]{4}-[0-9]{7}$/i)
        .required(),
      birthDate: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
    };

    const { error } = Joi.validate(req.body, schema);

    return returnErrorOrNext(error, res, next);
  },
  login(req, res, next) {
    const schema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      rememberMe: Joi.boolean(),
    };

    const { error } = Joi.validate(req.body, schema);

    return returnErrorOrNext(error, res, next);
  },
};
