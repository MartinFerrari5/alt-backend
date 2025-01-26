import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Nombre es requerido.",
  }),
  last_name: Joi.string().required().messages({
    "string.empty": "Apellido es requerido.",
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
