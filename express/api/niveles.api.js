const express = require("express");
const router = express.Router();
const nivelesController = require("../controllers/niveles.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Niveles]:", error);

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
    return res.status(404).json({ error: "El nivel solicitado no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todos los niveles
router.get("/", async (req, res) => {
  try {
    const niveles = await nivelesController.getAll();
    res.json(niveles);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los niveles.");
  }
});

// Obtener nivel por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const nivel = await nivelesController.getById(req.params.id);
    res.json(nivel);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el nivel.");
  }
});

// Crear nivel
router.post("/", async (req, res) => {
  try {
    const nuevoNivel = await nivelesController.create(req.body);
    res.status(201).json(nuevoNivel);
  } catch (error) {
    handleApiError(res, error, "Error al crear el nivel.");
  }
});

// Actualizar nivel
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await nivelesController.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el nivel.");
  }
});

// Eliminar nivel
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await nivelesController.remove(req.params.id);
    res.json({ message: "Nivel eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el nivel.");
  }
});

module.exports = router;
