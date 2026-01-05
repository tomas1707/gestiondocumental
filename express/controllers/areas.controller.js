// 1. Importamos el cliente Prisma
const prisma = require("../db/client");

/**
 * Obtener todas las áreas
 */
const getAll = async () => {
  return await prisma.area.findMany({
    orderBy: { id: "asc" },
  });
};

/**
 * Obtener un área por ID
 */
const getById = async (id) => {
  const areaId = parseInt(id, 10);

  if (isNaN(areaId)) throw new Error("INVALID_ID");

  const record = await prisma.area.findUnique({
    where: { id: areaId },
  });

  if (!record) throw new Error("NOT_FOUND");
  return record;
};

/**
 * Crear una nueva área
 */
const create = async (data) => {
  if (!data?.nombre_area) throw new Error("INVALID_DATA");

  return await prisma.area.create({
    data: {
      nombre_area: data.nombre_area.trim(),
    },
  });
};

/**
 * Actualizar un área existente
 */
const update = async (id, data) => {
  const areaId = parseInt(id, 10);

  if (isNaN(areaId)) throw new Error("INVALID_ID");

  if (!data?.nombre_area) throw new Error("INVALID_DATA");

  try {
    return await prisma.area.update({
      where: { id: areaId },
      data: {
        nombre_area: data.nombre_area.trim(),
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

/**
 * Eliminar un área
 */
const remove = async (id) => {
  const areaId = parseInt(id, 10);

  if (isNaN(areaId)) throw new Error("INVALID_ID");

  try {
    return await prisma.area.delete({
      where: { id: areaId },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
