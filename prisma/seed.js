const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Áreas
  await prisma.area.createMany({
    data: [
      { nombre_area: "Preseidencia Municipal" },
      { nombre_area: "Secretario del Ayuntamiento" },
      { nombre_area: "Sindicatura" },
      { nombre_area: "Regidor de Gobernación" },
      { nombre_area: "Regidor de Hacienda" },
      { nombre_area: "Regidor de Obras Públicas" },
      { nombre_area: "Regidor de Industria y Ganadería" },
      { nombre_area: "Regidor de Salud" },
      { nombre_area: "Regidor de Educación" },
      { nombre_area: "Regidor de Grupos Vulnerables" },
      { nombre_area: "Regidor de Igualdad de Género" },
      { nombre_area: "Regidor de Gobernación" },
      { nombre_area: "Sindicatura" },
      { nombre_area: "Dirección Jurídica" },
      { nombre_area: "Juez Calificador" },
      { nombre_area: "Contraloría" },
      { nombre_area: "Tesorería Municipal" },
      { nombre_area: "Dirección de Seguridad Pública" },
      { nombre_area: "Dirección de Obras Públicas" },
      { nombre_area: "Oficialia de Partes" },
      { nombre_area: "Dirección de Recursos Humanos" },
    ],
    skipDuplicates: true,
  });

  // Roles
  await prisma.rol.createMany({
    data: [
      { nombre_rol: "Dashboard Presedencia" },
      { nombre_rol: "Gestión ERP Documental" },
      { nombre_rol: "Visualizador ERP Documental" },
      { nombre_rol: "Gestión Dispersión Documental" },
      { nombre_rol: "Visualizador Dispersión Documental" },
      { nombre_rol: "Gestión de Recurso Humano" },
    ],
    skipDuplicates: true,
  });

  // Privilegios
  await prisma.privilegio.createMany({
    data: [
      { id: 1, titulo_privilegio: "Acceso Menú Usuarios", zona: 1 },
      { id: 2, titulo_privilegio: "Acceso Menú Dashboard", zona: 1 },
      { id: 3, titulo_privilegio: "Acceso Menú Documentos", zona: 1 },
      { id: 4, titulo_privilegio: "Acceso Menú Organigrama", zona: 1 },
      { id: 5, titulo_privilegio: "Acceso Menú Dispersión", zona: 1 },
      { id: 6, titulo_privilegio: "Acceso Menú Ley de Archivo", zona: 1 },
      { id: 7, titulo_privilegio: "Acceso Menú Configuración", zona: 1 },
      {
        id: 8,
        titulo_privilegio: "Menú Usuarios - Gestión de usuarios",
        zona: 2,
      },
      { id: 9, titulo_privilegio: "Menú Usuarios - Ver usuarios", zona: 2 },
      {
        id: 10,
        titulo_privilegio: "Menú Usuarios - Otorgar Privilegios",
        zona: 2,
      },
      {
        id: 11,
        titulo_privilegio: "Menú Dashboard - Ver y cambiar año y mes",
        zona: 2,
      },
      {
        id: 12,
        titulo_privilegio: "Menú Dashboard - Ver dashboard de año vigente",
        zona: 2,
      },
      {
        id: 13,
        titulo_privilegio: "Menú Documentos - Ver y responder documentos",
        zona: 2,
      },
      {
        id: 14,
        titulo_privilegio: "Menú Documentos - Ver documentos",
        zona: 2,
      },
      {
        id: 15,
        titulo_privilegio: "Menú Organigrama - Ver, crear y editar organigrama",
        zona: 2,
      },
      {
        id: 16,
        titulo_privilegio: "Menú Organigrama - Ver organigramas",
        zona: 2,
      },
      {
        id: 17,
        titulo_privilegio: "Menú Organigrama - Ver, crear y editar organigrama",
        zona: 2,
      },
      {
        id: 18,
        titulo_privilegio: "Menú Diseperción - Gestión de la disperción",
        zona: 2,
      },
      {
        id: 19,
        titulo_privilegio: "Menú Diseperción - Ver disperción",
        zona: 2,
      },
      {
        id: 20,
        titulo_privilegio: "Menú Ley de Archivo - Ver y editar clasificación",
        zona: 2,
      },
      {
        id: 21,
        titulo_privilegio: "Menú Ley de Archivo - Ver clasificación",
        zona: 2,
      },
      {
        id: 22,
        titulo_privilegio:
          "Menú Configuración - Gestión de credenciales de correo electrónico",
        zona: 2,
      },
      {
        id: 23,
        titulo_privilegio:
          "Menú Configuración - Gestión de credenciales de base de datos",
        zona: 2,
      },
      {
        id: 24,
        titulo_privilegio: "Menú Configuración - Ver y editar direcciones IP",
        zona: 2,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch((e) => {
    console.error("Error inesperado en el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
