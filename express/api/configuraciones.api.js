const express = require("express");
const router = express.Router();
const configuracionesController = require("../controllers/configuraciones.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Configuraciones]:", error);

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
    return res
      .status(404)
      .json({ error: "La configuración solicitada no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todas las configuraciones
router.get("/", async (req, res) => {
  try {
    const configs = await configuracionesController.getAll();
    res.json(configs);
  } catch (error) {
    handleApiError(res, error, "Error al obtener configuraciones.");
  }
});

// Obtener configuración por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const config = await configuracionesController.getById(req.params.id);
    res.json(config);
  } catch (error) {
    handleApiError(res, error, "Error al obtener la configuración.");
  }
});

// Crear configuración
router.post("/", async (req, res) => {
  try {
    const nuevaConfig = await configuracionesController.create(req.body);
    res.status(201).json(nuevaConfig);
  } catch (error) {
    handleApiError(res, error, "Error al crear la configuración.");
  }
});

// Actualizar configuración
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizada = await configuracionesController.update(
      req.params.id,
      req.body
    );
    res.json(actualizada);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar la configuración.");
  }
});

// Eliminar configuración
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await configuracionesController.remove(req.params.id);
    res.json({ message: "Configuración eliminada correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar la configuración.");
  }
});

module.exports = router;
