const joi = require("joi");

const SignupValidation = (req,res,next) => {
  const Schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    terms: joi.boolean().valid(true).required(),
    updates: joi.boolean().required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "inavlid input values", error });
  }

  next();
};

const LoginValidation = (req,res,next) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "inavlid input values", error });
  }

  next();
};


const OtpValidation = (req,res,next) => {
     const Schema = joi.object({
     email: joi.string().email().required(),
     otp: joi.string().length(6).required(),
    guestId: joi.string().allow('', null).optional() 
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "inavlid input values", error });
  }

  next()
}

module.exports = { SignupValidation, LoginValidation, OtpValidation };

