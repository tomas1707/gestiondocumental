const prisma = require("../db/client");

// Obtener todas las IPs
const getAll = async () => {
  return prisma.ip.findMany({
    include: {
      area: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};

// Obtener IP por ID
const getById = async (id) => {
  const ip = await prisma.ip.findUnique({
    where: { id: Number(id) },
    include: {
      area: true,
    },
  });

  if (!ip) throw new Error("NOT_FOUND");
  return ip;
};

// Crear IP
const create = async (data) => {
  if (data.id_area === undefined) {
    throw new Error("INVALID_DATA");
  }

  return prisma.ip.create({
    data: {
      ip_RH: Boolean(data.ip_RH),
      ip_areas: data.ip_areas?.trim(),
      grupo: data.grupo?.trim(),

      area: {
        connect: { id: Number(data.id_area) },
      },
    },
  });
};

// Actualizar IP
const update = async (id, data) => {
  try {
    return await prisma.ip.update({
      where: { id: Number(id) },
      data: {
        ip_RH: data.ip_RH !== undefined ? Boolean(data.ip_RH) : undefined,
        ip_areas: data.ip_areas?.trim(),
        grupo: data.grupo?.trim(),

        area: data.id_area
          ? { connect: { id: Number(data.id_area) } }
          : undefined,
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

// Eliminar IP
const remove = async (id) => {
  try {
    return await prisma.ip.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
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
