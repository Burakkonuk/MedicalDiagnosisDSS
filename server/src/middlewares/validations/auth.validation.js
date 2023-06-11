const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(2).max(100).required().messages({
            "string.base": "Name field must be regular text!",
            "string.empty": "Name field can't be empty!",
            "string.min": "Name must be at least 2 characters!",
            "string.max": "Name must be maximum 50 character!",
            "string.required": "Name field is required!",
          }),
          lastname: joi.string().trim().min(2).max(100).required().messages({
            "string.base": "Lastname field must be regular text!",
            "string.empty": "Lastname field can't be empty!",
            "string.min": "Lastname must be at least 2 characters!",
            "string.max": "Lastname must be maximum 50 character!",
            "string.required": "Lastname field is required!",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Email field must be regular text!",
              "string.empty": "Email field can't be empty!",
              "string.min": "Email must be at least 3 characters!",
              "string.email": "Please enter a valid email address!",
              "string.max": "Email must be maximum 50 character!",
              "string.required": "Email field is required!",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password field must be regular text!",
            "string.empty": "Password field can't be empty!",
            "string.min": "Password must be at least 6 characters!",
            "string.max": "Password must be maximum 36 character!",
            "string.required": "Password field is required!",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("Please obey the validation rules!", 400);
    }
    next();
  };

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            //.required()
            .messages({
              "string.base": "Email field must be regular text!",
              "string.empty": "Email field can't be empty!",
              "string.min": "Email must be at least 3 characters!",
              "string.email": "Please enter a valid email address!",
              "string.max": "Email must be maximum 50 character!",
              //"string.required": "Email field is required!",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Password field must be regular text!",
            "string.empty": "Password field can't be empty!",
            "string.min": "Password must be at least 6 characters!",
            "string.max": "Password must be maximum 36 character!",
            "string.required": "Password field is required!",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("Please obey the validation rules!", 400);
    }
    next();
  };
}

module.exports = authValidation;
