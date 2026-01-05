// 1. Dependencias
const express = require("express");
const cors = require("cors");
const pruebasApi = require("./express/api/prueba.api");
const areasApi = require("./express/api/areas.api");
const rolesPermisoApi = require("./express/api/usuarios.api");

// 2. Inicialización
const app = express();
const port = 3001;

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. se definen las rutas de la api para invocar cada endpoint
app.use("/api/pruebas", pruebasApi);
app.use("/api/areas", areasApi);
app.use("/api/usuarios", usuariosApi);
app.use("/api/rolespermiso", rolesPermisoApi);

// 5. Iniciar el Servidor de Express
app.listen(port, () => {
  console.log(`🚀 Express API interna corriendo en http://localhost:${port}`);
  console.log(
    `💡 Prisma se conectará automáticamente al recibir la primera petición.`
  );
});

module.exports = app;
