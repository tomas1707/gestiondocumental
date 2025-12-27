const express = require("express");
const router = express.Router();
const privilegiosController = require("../controllers/privilegios.controller");

// Función auxiliar para manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Privilegios]:", error);

  // Error de conexión con la base de datos
  if (
    error.code === "P1001" ||
    error.code === "P1002" ||
    error.code === "P1003"
  ) {
    return res.status(503).json({
      error:
        "No se pudo conectar con la base de datos. Verifique que el servidor esté disponible.",
    });
  }

  // Registro no encontrado
  if (error.message === "NOT_FOUND" || error.code === "P2025") {
    return res
      .status(404)
      .json({ error: "El privilegio solicitado no existe." });
  }

  // Restricción de unicidad
  if (error.code === "P2002") {
    return res
      .status(409)
      .json({ error: "Ya existe un privilegio con ese título." });
  }

  // Error genérico
  res.status(500).json({
    error: customMessage || "Ocurrió un error inesperado en el servidor.",
  });
};

// Obtener todos los privilegios
router.get("/", async (req, res) => {
  try {
    const privilegios = await privilegiosController.getAll();
    res.json(privilegios);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los privilegios.");
  }
});

// Crear privilegio
router.post("/", async (req, res) => {
  if (!req.body.titulo_privilegio) {
    return res
      .status(400)
      .json({ error: "El título del privilegio es obligatorio." });
  }

  try {
    const nuevoPrivilegio = await privilegiosController.create(req.body);
    res.status(201).json(nuevoPrivilegio);
  } catch (error) {
    handleApiError(res, error, "Error al crear el privilegio.");
  }
});

// Actualizar privilegio
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const actualizado = await privilegiosController.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el privilegio.");
  }
});

// Eliminar privilegio
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    await privilegiosController.remove(req.params.id);
    res.json({ message: "Privilegio eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el privilegio.");
  }
});

module.exports = router;
