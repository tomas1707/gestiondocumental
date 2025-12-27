const prisma = require("../db/client");

// Obtener todos los niveles
const getAll = async () => {
  return prisma.nivel.findMany({
    include: { organigrama: true, area: true },
    orderBy: { nivel: "asc" },
  });
};

// Obtener nivel por ID
const getById = async (id) => {
  const nivel = await prisma.nivel.findUnique({
    where: { id: Number(id) },
    include: { organigrama: true, area: true },
  });

  if (!nivel) throw new Error("NOT_FOUND");
  return nivel;
};

// Crear nivel
const create = async (data) => {
  if (!data.id_organigrama || !data.id_area || data.nivel === undefined)
    throw new Error("INVALID_DATA");

  return prisma.nivel.create({
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
