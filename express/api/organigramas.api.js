const express = require("express");
const router = express.Router();
const organigramasController = require("../controllers/organigramas.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API Organigramas]:", error);

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
      .json({ error: "El organigrama solicitado no existe." });
  }

  res
    .status(500)
    .json({ error: customMessage || "Ocurrió un error inesperado." });
};

// Obtener todos los organigramas
router.get("/", async (req, res) => {
  try {
    const orgs = await organigramasController.getAll();
    res.json(orgs);
  } catch (error) {
    handleApiError(res, error, "Error al obtener organigramas.");
  }
});

// Obtener organigrama por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const org = await organigramasController.getById(req.params.id);
    res.json(org);
  } catch (error) {
    handleApiError(res, error, "Error al obtener el organigrama.");
  }
});

// Crear organigrama
router.post("/", async (req, res) => {
  try {
    const nuevoOrg = await organigramasController.create(req.body);
    res.status(201).json(nuevoOrg);
  } catch (error) {
    handleApiError(res, error, "Error al crear el organigrama.");
  }
});

// Actualizar organigrama
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    const actualizado = await organigramasController.update(
      req.params.id,
      req.body
    );
    res.json(actualizado);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar el organigrama.");
  }
});

// Eliminar organigrama
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id))
    return res.status(400).json({ error: "ID inválido." });

  try {
    await organigramasController.remove(req.params.id);
    res.json({ message: "Organigrama eliminado correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar el organigrama.");
  }
});

module.exports = router;
