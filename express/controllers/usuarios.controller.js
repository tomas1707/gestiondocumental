const prisma = require("../db/client");

// Obtener todos los usuarios
const getAll = async () => {
  return prisma.usuario.findMany({
    include: {
      rol: true,
      area: true,
    },
    orderBy: {
      nombre_completo: "asc",
    },
  });
};

// Obtener usuario por ID
const getById = async (id) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    include: {
      rol: true,
      area: true,
    },
  });

  if (!usuario) throw new Error("NOT_FOUND");
  return usuario;
};

// Crear usuario
const create = async (data) => {
  if (
    !data.nombre_completo ||
    !data.nombre_usuario ||
    !data.contrasennia ||
    !data.id_rol ||
    !data.id_area
  ) {
    throw new Error("INVALID_DATA");
  }

  return prisma.usuario.create({
    data: {
      nombre_completo: data.nombre_completo.trim(),
      numero_trab: data.numero_trab,
      correo_electronico: data.correo_electronico,
      nombre_usuario: data.nombre_usuario.trim(),
      contrasenia: data.contrasennia,
      status: data.status ?? false,
      fecha_creacion: new Date(),

      rol: {
        connect: { id: Number(data.id_rol) },
      },
      area: {
        connect: { id: Number(data.id_area) },
      },
    },
  });
};

// Actualizar usuario
const update = async (id, data) => {
  try {
    return await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nombre_completo: data.nombre_completo?.trim(),
        numero_trab: data.numero_trab,
        correo_electronico: data.correo_electronico,
        nombre_usuario: data.nombre_usuario?.trim(),
        contrasenia: data.contrasennia,
        status: data.status,

        rol: data.id_rol ? { connect: { id: Number(data.id_rol) } } : undefined,

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

// Eliminar usuario
const remove = async (id) => {
  try {
    return await prisma.usuario.delete({
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
