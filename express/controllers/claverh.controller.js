const prisma = require("../db/client");

// Obtener todos los registros
const getAll = async () => {
  return prisma.claveRh.findMany({
    orderBy: { id: "asc" },
  });
};

// Obtener registro por ID
const getById = async (id) => {
  const record = await prisma.claveRh.findUnique({
    where: { id: Number(id) },
  });
  if (!record) throw new Error("NOT_FOUND");
  return record;
};

// Crear nuevo registro
const create = async (data) => {
  if (!data.clave) throw new Error("INVALID_DATA");

  return prisma.claveRh.create({
    data: {
      clave: data.clave.trim(),
    },
  });
};

// Actualizar registro
const update = async (id, data) => {
  if (!data.clave) throw new Error("INVALID_DATA");

  try {
    return prisma.claveRh.update({
      where: { id: Number(id) },
      data: {
        clave: data.clave.trim(),
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

// Eliminar registro
const remove = async (id) => {
  try {
    return prisma.claveRh.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
