const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los roles
const getAll = async () => {
  return prisma.rol.findMany({
    orderBy: {
      nombre_rol: "asc",
    },
  });
};

// Obtener rol por ID
const getById = async (id) => {
  const rol = await prisma.rol.findUnique({
    where: { id: Number(id) },
  });

  if (!rol) throw new Error("NOT_FOUND");
  return rol;
};

// Crear rol
const create = async (data) => {
  if (!data.nombre_rol) throw new Error("INVALID_DATA");

  return prisma.rol.create({
    data: {
      nombre_rol: data.nombre_rol.trim(),
    },
  });
};

// Actualizar rol
const update = async (id, data) => {
  if (!data.nombre_rol) throw new Error("INVALID_DATA");

  try {
    return await prisma.rol.update({
      where: { id: Number(id) },
      data: {
        nombre_rol: data.nombre_rol.trim(),
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("NOT_FOUND");
    }
    throw error;
  }
};

// Eliminar rol
const remove = async (id) => {
  try {
    return await prisma.rol.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("NOT_FOUND");
    }
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
