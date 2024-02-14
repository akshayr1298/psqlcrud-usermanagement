import * as Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "name must be at least {#limit} characters long",
    "string.max": "name cannot exceed {#limit} characters",
    "string.empty": "name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email":
      "Invalid email format. Please provide a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "string.empty": "password is required",
  }),
});

export const signInSchmea = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "email is required",
    "string.email":
      "Invalid email format. Please provide a valid email address.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "string.empty": "password is required",
  }),
});

export const editProfileSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "id is required",
  }),
  name: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "string.empty": "password is required",
  }),
  phoneNumber: Joi.string().min(10).required().messages({
    "string.min": "Phone number must be at least {#limit} characters long",
    "string.empty": "Phone number is required",
  }),
});

export const addressValidation = Joi.object({
  country: Joi.string().min(3).required().messages({
    "string.min": "country must be at least {#limit} characters long",
    "string.empty": "country is required",
  }),
  state: Joi.string().min(3).required().messages({
    "string.min": "state must be at least {#limit} characters long",
    "string.empty": "state is required",
  }),
  city: Joi.string().min(3).required().messages({
    "string.min": "city must be at least {#limit} characters long",
    "string.empty": "city is required",
  }),
  postalcode: Joi.number().required(),
  streetaddress: Joi.string().allow("").optional(),
  landmark: Joi.string().allow("").optional(), // Optional, allowing empty string
});
