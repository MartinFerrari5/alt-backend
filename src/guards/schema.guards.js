//src/guards/schema.guards.js

import Joi from "joi";

export const userSchema = Joi.object({
  full_name: Joi.string().required().messages({
    "string.empty": "Nombre  completo es requerido.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email requerido.",
    "string.email": "Email debe ser una direccion correcta.",
  }),
  password: Joi.string()
    .pattern(new RegExp("(?=.*[a-z])"), { name: "lowercase" }) // At least one lowercase letter
    .pattern(new RegExp("(?=.*[A-Z])"), { name: "uppercase" }) // At least one uppercase letter
    .pattern(new RegExp('(?=.*[!@#$%^&*(),.?":{}|<>])'), { name: "symbol" }) // At least one symbol
    .min(8)
    .required()
    .messages({
      "string.empty": "Contraseña requerida.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.pattern.name":
        "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
    }),
  // role: Joi.string().required().messages({
  //   "string.empty": "Rol es requerido.",
  //   "string.base": "Rol debe ser un string.",
  // }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email requerido.",
    "string.email": "Email debe ser una direccion correcta.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Contraseña requerida.",
  }),
});

export const taskSchema = Joi.object({
  company: Joi.string().required().messages({
    "string.empty": "La compañia es requerida.",
  }),
  project: Joi.string().min(3).required().messages({
    "string.empty": "El projecto es requerido.",
  }),
  task_type: Joi.string().required().messages({
    "string.empty": "El tipo de tarea es requerida.",
  }),
  task_description: Joi.optional().messages({
    "string.empty": "La descripcion es requerida.",
  }),
  entry_time: Joi.string()
    .pattern(new RegExp(/^([01]\d|2[0-3]):([0-5]\d)$/), { name: "time" })
    .required()
    .messages({
      "string.empty": "La hora de entrada es requerida.",
      "string.pattern.name": "El formato de la hora debe ser HH:MM",
    }),

  exit_time: Joi.required().messages({
    "string.empty": "La hora de salida es requerida.",
  }),
  hour_type: Joi.string().required().messages({
    "string.empty": "El tipo de hora es requerido.",
  }),
  lunch_hours: Joi.required().messages({
    "string.empty": "La hora de salida es requerida.",
  }),
  status: Joi.string().required().messages({
    "string.empty": "Status...",
  }),
  task_date: Joi.required().messages({
    "string.empty": "La fecha es requerida.",
  }),
});

export const passwordSchema = Joi.object({
  new_password: Joi.string()
    .pattern(new RegExp("(?=.*[a-z])"), { name: "lowercase" }) // At least one lowercase letter
    .pattern(new RegExp("(?=.*[A-Z])"), { name: "uppercase" }) // At least one uppercase letter
    .pattern(new RegExp('(?=.*[!@#$%^&*(),.?":{}|<>])'), { name: "symbol" }) // At least one symbol
    .min(8)
    .required()
    .messages({
      "string.empty": "Contraseña requerida.",
      "string.min": "La contraseña debe tener al menos 8 caracteres.",
      "string.pattern.name":
        "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
    }),
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email requerido.",
    "string.email": "Email debe ser una direccion correcta.",
  }),
});
