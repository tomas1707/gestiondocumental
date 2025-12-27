const express = require("express");
const router = express.Router();
const ipsController = require("../controllers/ips.controller");

// Manejo centralizado de errores
const handleApiError = (res, error, customMessage) => {
  console.error("[Error API IPs]:", error);

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
    return res.status(404).json({ error: "La IP solicitada no existe." });
  }

  // Error genérico
  res.status(500).json({
    error: customMessage || "Ocurrió un error inesperado.",
  });
};

// Obtener todas las IPs
router.get("/", async (req, res) => {
  try {
    const ips = await ipsController.getAll();
    res.json(ips);
  } catch (error) {
    handleApiError(res, error, "Error al obtener las IPs.");
  }
});

// Obtener IP por ID
router.get("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const ip = await ipsController.getById(req.params.id);
    res.json(ip);
  } catch (error) {
    handleApiError(res, error, "Error al obtener la IP.");
  }
});

// Crear IP
router.post("/", async (req, res) => {
  try {
    const nuevaIp = await ipsController.create(req.body);
    res.status(201).json(nuevaIp);
  } catch (error) {
    handleApiError(res, error, "Error al crear la IP.");
  }
});

// Actualizar IP
router.put("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const actualizada = await ipsController.update(req.params.id, req.body);
    res.json(actualizada);
  } catch (error) {
    handleApiError(res, error, "Error al actualizar la IP.");
  }
});

// Eliminar IP
router.delete("/:id", async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    await ipsController.remove(req.params.id);
    res.json({ message: "IP eliminada correctamente." });
  } catch (error) {
    handleApiError(res, error, "No se pudo eliminar la IP.");
  }
});

module.exports = router;
