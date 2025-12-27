const prisma = require("../db/client");

// Obtener todos los estados
const getAll = async () => {
  return prisma.estado.findMany({
    include: { documento: true },
    orderBy: { nombre_estado: "asc" },
  });
};

// Obtener estado por ID
const getById = async (id) => {
  const estado = await prisma.estado.findUnique({
    where: { id: Number(id) },
    include: { documento: true },
  });

  if (!estado) throw new Error("NOT_FOUND");
  return estado;
};

// Crear estado
const create = async (data) => {
  if (!data.id_documento || !data.nombre_estado)
    throw new Error("INVALID_DATA");

  return prisma.estado.create({
    data: {
      nombre_estado: data.nombre_estado.trim(),
      documento: { connect: { id: Number(data.id_documento) } },
    },
  });
};

// Actualizar estado
const update = async (id, data) => {
  try {
    return prisma.estado.update({
      where: { id: Number(id) },
      data: {
        nombre_estado: data.nombre_estado
          ? data.nombre_estado.trim()
          : undefined,
        documento: data.id_documento
          ? { connect: { id: Number(data.id_documento) } }
          : undefined,
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

// Eliminar estado
const remove = async (id) => {
  try {
    return prisma.estado.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
