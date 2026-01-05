const prisma = require("../db/client");

// Obtener todos los niveles
const getAll = async () => {
  return prisma.rolPermiso.findMany({
    include: { privilegio: true, rol: true },
    orderBy: { id_rol: "asc" },
  });
};

// Obtener nivel por ID
const getById = async (id) => {
  const rolpermiso = await prisma.rolPermiso.findUnique({
    where: { id: Number(id) },
    include: { privilegio: true, rol: true },
  });

  if (!rolpermiso) throw new Error("NOT_FOUND");
  return rolpermiso;
};

// Crear nivel
const create = async (data) => {
  if (!data.id_privilegio || !data.id_rol || data.rolPermiso === undefined)
    throw new Error("INVALID_DATA");

  return prisma.rolPermiso.create({
    data: {
      nivel: Number(data.nivel),
      area_superior: data.area_superior || null,
      organigrama: { connect: { id: Number(data.id_organigrama) } },
      area: { connect: { id: Number(data.id_area) } },
    },
  });
};

// Actualizar nivel
const update = async (id, data) => {
  try {
    return prisma.nivel.update({
      where: { id: Number(id) },
      data: {
        nivel: data.nivel !== undefined ? Number(data.nivel) : undefined,
        area_superior: data.area_superior,
        organigrama: data.id_organigrama
          ? { connect: { id: Number(data.id_organigrama) } }
          : undefined,
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

// Eliminar nivel
const remove = async (id) => {
  try {
    return prisma.nivel.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
