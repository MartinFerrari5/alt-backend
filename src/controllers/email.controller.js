//src/controllers/email.controller.js

import { emailSchema } from "../guards/schema.guards.js";
import {
  addEmailService,
  deleteEmailService,
  getAllEmailsService,
} from "../services/email/email.service.js";

async function addEmailController(req, res, next) {
  try {
    const { email } = req.body;
    const { error } = emailSchema.validate({ email });

    if (error) {
      return res.status(400).json(error.message);
    }

    await addEmailService(email);
    res.status(200).json({ message: "Email creado" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function deleteEmailController(req, res, next) {
  try {
    const { email_id } = req.params;
    await deleteEmailService(email_id);

    res.status(200).json({ message: "Email Eliminado" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getAllEmailsController(req, res, next) {
  try {
    const emails = await getAllEmailsService();
    res.status(200).json(emails);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export { addEmailController, deleteEmailController, getAllEmailsController };
