const prisma = require("../db/client");

// Obtener todos los organigramas
const getAll = async () => {
  return prisma.organigrama.findMany({
    include: { usuario: true, niveles: true },
    orderBy: { id: "asc" },
  });
};

// Obtener organigrama por ID
const getById = async (id) => {
  const org = await prisma.organigrama.findUnique({
    where: { id: Number(id) },
    include: { usuario: true, niveles: true },
  });

  if (!org) throw new Error("NOT_FOUND");
  return org;
};

// Crear organigrama
const create = async (data) => {
  if (!data.id_usuario || !data.titulo) throw new Error("INVALID_DATA");

  return prisma.organigrama.create({
    data: {
      titulo: data.titulo.trim(),
      version: data.version ? Number(data.version) : 1,
      fecha_solicitud: data.fecha_solicitud || new Date(),
      fecha_autorizacion: data.fecha_autorizacion || null,
      autorizado: data.autorizado || false,
      usuario: { connect: { id: Number(data.id_usuario) } },
    },
  });
};

// Actualizar organigrama
const update = async (id, data) => {
  try {
    return prisma.organigrama.update({
      where: { id: Number(id) },
      data: {
        titulo: data.titulo?.trim(),
        version: data.version ? Number(data.version) : undefined,
        fecha_solicitud: data.fecha_solicitud,
        fecha_autorizacion: data.fecha_autorizacion,
        autorizado: data.autorizado,
        usuario: data.id_usuario
          ? { connect: { id: Number(data.id_usuario) } }
          : undefined,
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

// Eliminar organigrama
const remove = async (id) => {
  try {
    return prisma.organigrama.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
