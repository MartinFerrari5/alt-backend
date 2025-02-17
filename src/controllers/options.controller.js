// src/controllers/options.controller.js

import {
  addOptionsService,
  getOptionsService,
  updateOptionsService,
  deleteOptionsService,
} from "../services/tasks/options.service.js";
import { config } from "../utils/config.js";

const {} = config;
async function getOptionsController(req, res) {
  try {
    const { table } = req.query;
    const [options] = await getOptionsService(table);
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

async function updateOptionsController(req, res) {
  try {
    const { options_id } = req.query;
    const { table, option } = req.body;

    await updateOptionsService(options_id, table, option);

    res.status(200).json({ message: "Opcion Actualizada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}
async function deleteOptionsController(req, res) {
  try {
    const { options_id } = req.query;
    const { table } = req.body;
    await deleteOptionsService(options_id, table);

    res.status(200).json({ message: "Opcion Eliminada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}
export {
  getOptionsController,
  addOptionsController,
  updateOptionsController,
  deleteOptionsController,
};
