const express = require("express");
const router = express.Router();
const rolespermisoController = require("../controllers/rolespermiso.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Roles Permiso]:", error);

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
    const rolespermiso = await rolespermisoController.getAll();
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
    const rolespermiso = await rolespermisoController.getById(req.params.id);
    res.json(rolespermiso);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el rol con permiso.");
  }
});

// Crear nivel
router.post("/", async (req, res) => {
  try {
    const nuevoRolpermiso = await rolespermisoController.create(req.body);
    res.status(201).json(nuevoRolpermiso);
  } catch (error) {
    handleApiError(res, error, "Error al crear un nuevo rol con permiso.");
  }
});

// Actualizar nivel
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await rolespermisoController.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el rol con permiso.");
  }
});

// Eliminar nivel
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await rolespermisoController.remove(req.params.id);
    res.json({ message: "Rol con permiso eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el rol con permiso.");
  }
});

module.exports = router;
