const express = require("express");
const router = express.Router();
const documentosController = require("../controllers/documentos.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Documentos]:", error);

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
      .json({ error: "El documento solicitado no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todos los documentos
router.get("/", async (req, res) => {
  try {
    const documentos = await documentosController.getAll();
    res.json(documentos);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los documentos.");
  }
});

// Obtener documento por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const documento = await documentosController.getById(req.params.id);
    res.json(documento);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el documento.");
  }
});

// Crear documento
router.post("/", async (req, res) => {
  try {
    const nuevoDocumento = await documentosController.create(req.body);
    res.status(201).json(nuevoDocumento);
  } catch (error) {
    handleApiError(res, error, "Error al crear el documento.");
  }
});

// Actualizar documento
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await documentosController.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el documento.");
  }
});

// Eliminar documento
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await documentosController.remove(req.params.id);
    res.json({ message: "Documento eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el documento.");
  }
});

module.exports = router;
