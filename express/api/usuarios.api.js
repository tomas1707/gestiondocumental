const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Usuarios]:", error);

  // Errores de conexión DB
  if (
    error.code === "P1001" ||
    error.code === "P1002" ||
    error.code === "P1003"
  ) {
    return res.status(503).json({
      error: "No se pudo conectar con la base de datos. Verifique el servidor.",
    });
  }

  // Registro no encontrado
  if (error.message === "NOT_FOUND" || error.code === "P2025") {
    return res.status(404).json({ error: "El usuario no existe." });
  }

  // Duplicados
  if (error.code === "P2002") {
    return res
      .status(409)
      .json({ error: "Ya existe un usuario con esos datos." });
  }

  // Error genérico
  res.status(500).json({
    error: customMessage || "Ocurrió un error inesperado.",
  });
};

// Obtener usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await usuariosController.getAll();
    res.json(usuarios);
  } catch (error) {
    handleApiError(res, error, "Error al obtener los usuarios.");
  }
});

// Obtener usuario por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const usuario = await usuariosController.getById(req.params.id);
    res.json(usuario);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el usuario.");
  }
});

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const nuevoUsuario = await usuariosController.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    handleApiError(res, error, "Error al crear el usuario.");
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const actualizado = await usuariosController.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el usuario.");
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    await usuariosController.remove(req.params.id);
    res.json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el usuario.");
  }
});

module.exports = router;
