const { contextBridge, ipcRenderer, shell } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  // Escucha clics en todo el documento
  document.body.addEventListener("click", (event) => {
    // Busca el elemento más cercano que sea un enlace <a>
    const link = event.target.closest("a");

    if (link) {
      const url = link.href;

      // Solo actuamos sobre enlaces externos o con target="_blank"
      if (link.target === "_blank" || !url.startsWith(window.location.origin)) {
        event.preventDefault(); // Detiene la navegación o la apertura de la nueva ventana

        // Abre la URL en el navegador por defecto del sistema
        shell.openExternal(url);
      }
    }
  });
});
// ----------------------------------------------------

// Lógica de electronAPI (debe ser la misma que antes)
contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => {
    let validSendChannels = ["toMain"];
    if (validSendChannels.includes(channel)) ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    let validReceiveChannels = ["fromMain"];
    if (validReceiveChannels.includes(channel))
      ipcRenderer.once(channel, (event, ...args) => func(...args));
  },
});