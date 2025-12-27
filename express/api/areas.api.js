const express = require("express");
const router = express.Router();
const areasController = require("../controllers/areas.controller");

/**
 * Función auxiliar para mapear errores y mejorar la legibilidad
 */
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Areas]:", error);

  // Errores de validación
  if (error.message === "INVALID_ID") {
    return res.status(400).json({ error: "ID inválido." });
  }

  if (error.message === "INVALID_DATA") {
    return res
      .status(400)
      .json({ error: "El nombre del área es obligatorio." });
  }

  // Errores de conexión con la base de datos
  if (
    error.code === "P1001" ||
    error.code === "P1002" ||
    error.code === "P1003"
  ) {
    return res.status(503).json({
      error:
        "No se pudo conectar con la base de datos. Verifique que el servidor MySQL esté encendido.",
    });
  }

  // Registro no encontrado
  if (error.message === "NOT_FOUND" || error.code === "P2025") {
    return res.status(404).json({
      error: "El área solicitada no existe.",
    });
  }

  // Duplicados (Unique Constraint)
  if (error.code === "P2002") {
    return res.status(409).json({
      error: "Ya existe un área con ese nombre.",
    });
  }

  // Error genérico
  return res.status(500).json({
    error: customMessage || "Ocurrió un error inesperado en el servidor.",
  });
};

//*****************************
/**CRUD PARA LA TABLA AREAS **/
//*****************************
/**
 * GET /areas
 */
router.get("/", async (req, res) => {
  try {
    const areas = await areasController.getAll();
    res.json(areas);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el listado de áreas.");
  }
});

/**
 * POST /areas
 */
router.post("/", async (req, res) => {
  try {
    const newArea = await areasController.create(req.body);
    res.status(201).json(newArea);
  } catch (error) {
    handleApiError(res, error, "Error al intentar crear el área.");
  }
});

/**
 * PUT /areas/:id
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await areasController.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el área.");
  }
});

/**
 * DELETE /areas/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await areasController.remove(req.params.id);
    res.status(200).json({
      message: "Área eliminada correctamente.",
    });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el área.");
  }
});

module.exports = router;
