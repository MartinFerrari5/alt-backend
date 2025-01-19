import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email requerido.',
      'string.email': 'Email debe ser una direccion correcta.',
    }),
    password: Joi.string().min(8).required().messages({
      'string.empty': 'Contraseña requerida.',
      'string.min': 'La contraseña debe tener al menos 8 caracteres.',
    }),
  });