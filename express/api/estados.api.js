const express = require("express");
const router = express.Router();
const estadosController = require("../controllers/estados.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Estados]:", error);

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
    return res.status(404).json({ error: "El estado solicitado no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todos los estados
router.get("/", async (req, res) => {
  try {
    const estados = await estadosController.getAll();
    res.json(estados);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los estados.");
  }
});

// Obtener estado por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const estado = await estadosController.getById(req.params.id);
    res.json(estado);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el estado.");
  }
});

// Crear estado
router.post("/", async (req, res) => {
  try {
    const nuevoEstado = await estadosController.create(req.body);
    res.status(201).json(nuevoEstado);
  } catch (error) {
    handleApiError(res, error, "Error al crear el estado.");
  }
});

// Actualizar estado
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await estadosController.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el estado.");
  }
});

// Eliminar estado
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await estadosController.remove(req.params.id);
    res.json({ message: "Estado eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el estado.");
  }
});

module.exports = router;
