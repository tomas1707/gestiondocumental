const prisma = require("../db/client");

// Obtener todos los documentos
const getAll = async () => {
  return prisma.documento.findMany({
    include: {
      area: true,
      clasificacion: true,
      estados: true,
    },
    orderBy: { fecha_recepcion: "desc" },
  });
};

// Obtener documento por ID
const getById = async (id) => {
  const documento = await prisma.documento.findUnique({
    where: { id: Number(id) },
    include: {
      area: true,
      clasificacion: true,
      estados: true,
    },
  });

  if (!documento) throw new Error("NOT_FOUND");
  return documento;
};

// Crear documento
const create = async (data) => {
  if (!data.id_area || !data.id_clasificacion || !data.titulo_documento)
    throw new Error("INVALID_DATA");

  return prisma.documento.create({
    data: {
      id_area: Number(data.id_area),
      id_clasificacion: Number(data.id_clasificacion),
      num_oficio: data.num_oficio?.trim(),
      asunto: data.asunto?.trim(),
      archivo: data.archivo?.trim(),
      titulo_documento: data.titulo_documento.trim(),
      fecha_recepcion: data.fecha_recepcion,
      fecha_asignacion: data.fecha_asignacion,
      fecha_limite: data.fecha_limite,
      fecha_respuesta: data.fecha_respuesta,
      respuesta_recibida: data.respuesta_recibida?.trim(),
      fecha_entrega: data.fecha_entrega,
    },
  });
};

// Actualizar documento
const update = async (id, data) => {
  try {
    return prisma.documento.update({
      where: { id: Number(id) },
      data: {
        id_area: data.id_area ? Number(data.id_area) : undefined,
        id_clasificacion: data.id_clasificacion
          ? Number(data.id_clasificacion)
          : undefined,
        num_oficio: data.num_oficio?.trim(),
        asunto: data.asunto?.trim(),
        archivo: data.archivo?.trim(),
        titulo_documento: data.titulo_documento?.trim(),
        fecha_recepcion: data.fecha_recepcion,
        fecha_asignacion: data.fecha_asignacion,
        fecha_limite: data.fecha_limite,
        fecha_respuesta: data.fecha_respuesta,
        respuesta_recibida: data.respuesta_recibida?.trim(),
        fecha_entrega: data.fecha_entrega,
      },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

// Eliminar documento
const remove = async (id) => {
  try {
    return prisma.documento.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    if (error.code === "P2025") throw new Error("NOT_FOUND");
    throw error;
  }
};

module.exports = { getAll, getById, create, update, remove };
