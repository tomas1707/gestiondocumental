const prisma = require("../db/client");

// Obtener todas las clasificaciones
const getAll = async () => {
  return prisma.clasificacion.findMany({
    orderBy: { area_administrativa: "asc" },
  });
};

// Obtener clasificación por ID
const getById = async (id) => {
  const record = await prisma.clasificacion.findUnique({
    where: { id: Number(id) },
  });
  if (!record) throw new Error("NOT_FOUND");
  return record;
};

// Crear clasificación
const create = async (data) => {
  if (!data.area_administrativa || !data.codigo_asignado)
    throw new Error("INVALID_DATA");

  return prisma.clasificacion.create({
    data: {
      area_administrativa: data.area_administrativa.trim(),
      codigo_asignado: data.codigo_asignado.trim(),
      ubicacion: data.ubicacion?.trim(),
      funcion: data.funcion?.trim(),
    },
  });
};

// Actualizar clasificación
const update = async (id, data) => {
  try {
    return prisma.clasificacion.update({
      where: { id: Number(id) },
      data: {
        area_administrativa: data.area_administrativa?.trim(),
        codigo_asignado: data.codigo_asignado?.trim(),
        ubicacion: data.ubicacion?.trim(),
        funcion: data.funcion?.trim(),
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

// Eliminar clasificación
const remove = async (id) => {
  try {
    return prisma.clasificacion.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
