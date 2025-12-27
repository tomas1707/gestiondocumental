const express = require("express");
const router = express.Router();
const claverhController = require("../controllers/claverh.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Claverh]:", error);

  if (
    error.code === "P1001" ||
    error.code === "P1002" ||
    error.code === "P1003"
  ) {
    return res.status(503).json({
      error: "No se pudo conectar con la base de datos. Verifique el servidor.",
    });
  }

  if (error.message === "NOT_FOUND" || error.code === "P2025") {
    return res.status(404).json({ error: "El registro solicitado no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todos los registros
router.get("/", async (req, res) => {
  try {
    const registros = await claverhController.getAll();
    res.json(registros);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los registros.");
  }
});

// Obtener registro por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const registro = await claverhController.getById(req.params.id);
    res.json(registro);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el registro.");
  }
});

// Crear registro
router.post("/", async (req, res) => {
  try {
    const nuevo = await claverhController.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    handleApiError(res, error, "Error al crear el registro.");
  }
});

// Actualizar registro
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await claverhController.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el registro.");
  }
});

// Eliminar registro
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await claverhController.remove(req.params.id);
    res.json({ message: "Registro eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el registro.");
  }
});

module.exports = router;
