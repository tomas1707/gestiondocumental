const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const url = require("url");

// Silenciar las advertencias de seguridad de Electron en la consola
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// ------------------------------------------------------------------
// Mantenemos la variable de entorno aquí, donde se establece primero.
process.env.PRISMA_FORCE_NAPI = "true";
// ------------------------------------------------------------------

let mainWindow;

// Variable global para mantener la referencia al servidor una vez iniciado.
let apiServer = null;

async function createWindow() {
  // 2. Importación dinámica de electron-is-dev
  const { default: isDev } = await import("electron-is-dev"); // Definir el CSP un poco de seguridad

  const csp = isDev
    ? "default-src 'self' http://localhost:3000; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' http://localhost:3000"
    : "default-src 'self'; script-src 'self'";

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    maximizable: true, //desactiva el boton de maximizar
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // ...
      contentSecurityPolicy: csp, // Aplicamos la CSP aquí
      preload: path.join(__dirname, "preload.js"),
    },
  }); // mainWindow.maximize(); //por defaul tla ventana estará maximizada

  const startUrl = isDev
    ? "http://localhost:3000" // Modo Desarrollo: carga el servidor de React
    : url.format({
        pathname: path.join(__dirname, "build/index.html"), // Modo Producción: carga el build estático
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(startUrl);
  /*
  if (isDev) {
    mainWindow.webContents.openDevTools();
    // Esto se utiliza solo para relizar pruebas con el depurador
  }
    */

  // 1. Interceptar solicitudes para abrir nuevas ventanas (target="_blank")

  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault(); // Detiene la creación de la nueva ventana // Si la URL es de tu aplicación (localhost o archivo), cárgala en la ventana actual

    if (url.startsWith("http://localhost") || url.startsWith("file://")) {
      mainWindow.loadURL(url);
    } else {
      // Si es una URL externa, ábrela en el navegador por defecto del sistema
      shell.openExternal(url);
    }
  }); // 2. Interceptar redirecciones y navegación (para URLs externas)

  mainWindow.webContents.on("will-navigate", (event, url) => {
    // Si la URL NO es de tu aplicación (React Dev Server o archivo local)
    if (!url.startsWith("http://localhost") && !url.startsWith("file://")) {
      event.preventDefault(); // Detiene la navegación
      shell.openExternal(url); // Abre la URL en el navegador del sistema
    }
  });

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// ------------------------------------------------------------------
// 📌 CORRECCIÓN CRÍTICA: INICIAR EL SERVIDOR DENTRO DE app.whenReady()
// ------------------------------------------------------------------
app.whenReady().then(() => {
  //INICIAMOS EL BACKEND DE EXPRESS/PRISMA AQUÍ
  if (!apiServer) {
    apiServer = require("./server"); // El servidor solo se inicia cuando Electron está listo.
  }

  createWindow();

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});
// ------------------------------------------------------------------

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
