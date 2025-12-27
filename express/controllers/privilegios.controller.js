const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los privilegios
const getAll = async () => {
  return prisma.privilegio.findMany({
    orderBy: {
      titulo_privilegio: "asc",
    },
  });
};

// Crear privilegio
const create = async (data) => {
  return prisma.privilegio.create({
    data: {
      titulo_privilegio: data.titulo_privilegio,
    },
  });
};

// Actualizar privilegio
const update = async (id, data) => {
  try {
    return await prisma.privilegio.update({
      where: { id: Number(id) },
      data: {
        titulo_privilegio: data.titulo_privilegio,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("NOT_FOUND");
    }
    throw error;
  }
};

// Eliminar privilegio
const remove = async (id) => {
  try {
    return await prisma.privilegio.delete({
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
  create,
  update,
  remove,
};
