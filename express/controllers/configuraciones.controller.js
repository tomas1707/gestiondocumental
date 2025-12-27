const prisma = require("../db/client");

// Obtener todas las configuraciones
const getAll = async () => {
  return prisma.configuracion.findMany({
    include: { usuario: true },
    orderBy: { id: "asc" },
  });
};

// Obtener configuración por ID
const getById = async (id) => {
  const config = await prisma.configuracion.findUnique({
    where: { id: Number(id) },
    include: { usuario: true },
  });

  if (!config) throw new Error("NOT_FOUND");
  return config;
};

// Crear configuración
const create = async (data) => {
  if (!data.id_usuario || !data.correo_remitente || !data.contrasenia) {
    throw new Error("INVALID_DATA");
  }

  return prisma.configuracion.create({
    data: {
      correo_remitente: data.correo_remitente.trim(),
      contrasenia: data.contrasenia.trim(),
      smtp: data.smtp?.trim(),
      puerto: data.puerto ? Number(data.puerto) : undefined,

      usuario: {
        connect: { id: Number(data.id_usuario) },
      },
    },
  });
};

// Actualizar configuración
const update = async (id, data) => {
  try {
    return prisma.configuracion.update({
      where: { id: Number(id) },
      data: {
        correo_remitente: data.correo_remitente?.trim(),
        contrasenia: data.contrasenia?.trim(),
        smtp: data.smtp?.trim(),
        puerto: data.puerto ? Number(data.puerto) : undefined,

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

// Eliminar configuración
const remove = async (id) => {
  try {
    return prisma.configuracion.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
