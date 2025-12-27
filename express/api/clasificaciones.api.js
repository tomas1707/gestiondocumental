const express = require("express");
const router = express.Router();
const clasificacionesController = require("../controllers/clasificaciones.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Clasificaciones]:", error);

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
      .json({ error: "La clasificación solicitada no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todas las clasificaciones
router.get("/", async (req, res) => {
  try {
    const registros = await clasificacionesController.getAll();
    res.json(registros);
  } catch (error) {
    handleApiError(res, error, "Error al obtener las clasificaciones.");
  }
});

// Obtener clasificación por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const registro = await clasificacionesController.getById(req.params.id);
    res.json(registro);
  } catch (error) {
    handleApiError(res, error, "Error al obtener la clasificación.");
  }
});

// Crear clasificación
router.post("/", async (req, res) => {
  try {
    const nuevo = await clasificacionesController.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    handleApiError(res, error, "Error al crear la clasificación.");
  }
});

// Actualizar clasificación
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await clasificacionesController.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar la clasificación.");
  }
});

// Eliminar clasificación
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await clasificacionesController.remove(req.params.id);
    res.json({ message: "Clasificación eliminada correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar la clasificación.");
  }
});

module.exports = router;
