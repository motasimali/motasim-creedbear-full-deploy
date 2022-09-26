const { EMAIL_VALIDATION_RULE, USER_VALIDATION_RULE } = require("../constants");
const timer = require("../helpers/timer");
const validator = require("../helpers/validate");
const validate = async (req, res, next, validationRule) => {
  timer(async () => {
    await validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          status: "failed",
          errors: err.errors,
        });
      } else {
        next();
      }
    }).catch((err) => console.log(err));
  });
};
const validateUser = async (req, res, next) => {
  validate(req, res, next, USER_VALIDATION_RULE);
};
const validateEmail = (req, res, next) => {
  validate(req, res, next, EMAIL_VALIDATION_RULE);
};

module.exports = {
  validateUser,
  validateEmail,
};
