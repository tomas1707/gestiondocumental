const { PrismaClient } = require("@prisma/client");
const path = require("path");

// 1. Cargamos el .env de forma absoluta antes de instanciar nada
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// 2. Verificamos que la variable esté en el proceso global
if (!process.env.DATABASE_URL) {
  console.error("ERROR: DATABASE_URL no encontrada en process.env");
}

// 3. Constructor VACÍO.
// Prisma 7.2 buscará por defecto process.env.DATABASE_URL
// Esto evita el error de "Unknown property" porque no pasamos objeto.
const prisma = new PrismaClient();

module.exports = prisma;
