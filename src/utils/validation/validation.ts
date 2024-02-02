import * as Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "name must be at least {#limit} characters long",
    "string.max": "name cannot exceed {#limit} characters",
    "string.empty": "name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    'string.email': 'Invalid email format. Please provide a valid email address.',
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "string.empty": "password is required",
  }),
});
