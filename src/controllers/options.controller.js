// src/controllers/options.controller.js

import {
  addOptionsService,
  getOptionsService,
} from "../services/tasks/options.service.js";
import { config } from "../utils/config.js";

const {} = config;
async function getOptionsController(req, res) {
  try {
    const { table } = req.params;
    const options = await getOptionsService(table);
    res.status(200).json(options);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function addOptionsController(req, res) {
  try {
    const { table, option } = req.body;

    await addOptionsService(table, option, req.user);

    res.status(200).json({ message: "Opcion Agregada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export { getOptionsController, addOptionsController };
