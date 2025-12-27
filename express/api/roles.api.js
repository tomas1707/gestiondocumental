const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/roles.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Roles]:", error);

  // Errores de conexión a la base de datos
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
    return res.status(404).json({ error: "El rol solicitado no existe." });
  }

  // Duplicados (unique constraint)
  if (error.code === "P2002") {
    return res.status(409).json({ error: "Ya existe un rol con ese nombre." });
  }

  // Error genérico
  res.status(500).json({
    error: customMessage || "Ocurrió un error inesperado en el servidor.",
  });
};

// Obtener todos los roles
router.get("/", async (req, res) => {
  try {
    const roles = await rolesController.getAll();
    res.json(roles);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los roles.");
  }
});

// Obtener rol por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const rol = await rolesController.getById(req.params.id);
    res.json(rol);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el rol.");
  }
});

// Crear rol
router.post("/", async (req, res) => {
  if (!req.body.nombre_rol) {
    return res.status(400).json({ error: "El nombre del rol es obligatorio." });
  }

  try {
    const nuevoRol = await rolesController.create(req.body);
    res.status(201).json(nuevoRol);
  } catch (error) {
    handleApiError(res, error, "Error al crear el rol.");
  }
});

// Actualizar rol
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const actualizado = await rolesController.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el rol.");
  }
});

// Eliminar rol
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    await rolesController.remove(req.params.id);
    res.json({ message: "Rol eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el rol.");
  }
});

module.exports = router;
