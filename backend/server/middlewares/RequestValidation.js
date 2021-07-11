class RequestValidation {
  constructor(joi, error) {
    this.joi = joi;
    this.error = error;
  }

  validateLoginBody = (req, res, next) => {
    const { body } = req;
    const schema = this.joi.object().keys({
      email: this.joi
        .string()
        .email()
        .required(),
      password: this.joi
        .string()
        .min(8)
        .required(),
    });
    const result = schema.validate(body);
    const { error } = result;
    const valid = error == null;
    if (valid) {
      next();
    } else {
      res
        .status(400)
        .json(this.error('Validation Error', 'Incorrect / Missing value in request query', 400));
    }
  };

  validateGetGeneticResultQuery = (req, res, next) => {
    const { query } = req;
    const schema = this.joi.object().keys({
      type: this.joi.number().greater(0),
    });
    const result = schema.validate(query);
    const { error } = result;
    const valid = error == null;
    if (valid) {
      next();
    } else {
      res
        .status(400)
        .json(this.error('Validation Error', 'Incorrect / Missing value in request query', 400));
    }
  };
}

module.exports = RequestValidation;
