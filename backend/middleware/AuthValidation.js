const joi = require("joi");

const SignupValidation = (req,res,next) => {
  const Schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    phone: joi.string().pattern(/^[0-9]{10}$/).required(),
    terms: joi.boolean().valid(true).required(),
    updates: joi.boolean().required(),
  }).unknown();

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
  message: "Invalid input",
  details: error.details,
});
  }

  next();
};

const LoginValidation = (req,res,next) => {
  const Schema = joi.object({
    phone: joi.string().pattern(/^[0-9]{10}$/).required(),
  }).unknown();

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "invalid input values", details: error.details });
  }

  next();
};


const OtpValidation = (req,res,next) => {
     const Schema = joi.object({
     phone: joi.string().pattern(/^[0-9]{10}$/).required(),
     otp: joi.string().length(6).required(),
    guestId: joi.string().allow('', null).optional() 
  }).unknown();

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "invalid input values", details: error.details });
  }

  next()
}

module.exports = { SignupValidation, LoginValidation, OtpValidation };

