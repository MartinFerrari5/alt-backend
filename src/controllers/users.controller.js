//src/controllers/users.controller.js

import { userSchema } from "../guards/schema.guards.js";
import {
  sendNewPasswordService,
  changePasswordService,
} from "../services/users/password.service.js";
import {
  getAllUsersFromDB,
  getUserByIdFromDB,
  addUserToDB,
  deleteUserService,
  updateUserService,
} from "../services/users/users.service.js";

const getAllUsersController = async (req, res) => {
  const result = await getAllUsersFromDB();
  res.status(200).json(result[0]);
};

const getUserByIdController = async (req, res) => {
  const { user_id } = req.query;
  const result = await getUserByIdFromDB(user_id);
  res.status(200).json(result[0]);
};

const addUserController = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;

    const { error } = userSchema.validate({
      full_name,
      email,
      password,
    });

    if (error) {
      return res.status(400).json(error.message);
    }

    await addUserToDB(full_name, email, password, role);

    return res.status(200).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

async function sendNewPasswordController(req, res, next) {
  try {
    const { email } = req.body;

    await sendNewPasswordService(email);
    res
      .status(200)
      .json({ message: "Se ha enviado un correo con tu nueva contraseña" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function changePasswordController(req, res, next) {
  try {
    const { email, old_password, new_password } = req.body;

    await changePasswordService(
      email,
      old_password,
      new_password,
      req.userData,
    );

    res.status(200).json({ message: "Contraseña cambiada" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

async function updateUserController(req, res) {
  try {
    const { user_id } = req.query;

    await updateUserService(user_id, req.body);

    res.status(200).json({ message: "Usuario Actualizado" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function deleteUserController(req, res) {
  try {
    const { user_id } = req.query;

    await deleteUserService(user_id);
    res.status(200).json({ message: "Usuario Eliminado" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export {
  getAllUsersController,
  getUserByIdController,
  addUserController,
  sendNewPasswordController,
  changePasswordController,
  updateUserController,
  deleteUserController,
};
