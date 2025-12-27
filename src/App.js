import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPrincipal from "./views/LoginPrincipal";
import Layout from "./components/Layout";
import Usuarios from "./views/Usuarios";
import Dashboard from "./views/Dashboard";
import Dispersion from "./views/Dispersion";
import Organigrama from "./views/Organigrama";
import Documentos from "./views/Documentos";
import LeyArchivo from "./views/LeyArchivo";
import NotificacionConexionBD from "./views/NotificacionConexionBD";
import DireccionesIp from "./views/DireccionesIP";

import "./App.css";

function App() {
  return (
     <Router>
      <Routes>
         <Route path="/login" element={<LoginPrincipal />} />
         <Route index element={<LoginPrincipal />} />

        <Route path="/" element={<Layout />}>
          <Route path="Usuarios" element={<Usuarios />} />
          <Route path="Dashboard" element={<Dashboard />} />
         <Route path="Dispersion" element={<Dispersion />} />
          <Route path="organigrama" element={<Organigrama />} />
          <Route path="Documentos" element={<Documentos />} />
          <Route path="LeyArchivo" element={<LeyArchivo />} />
          <Route path="/config/notificacion-conexion" element={<NotificacionConexionBD />} />
           <Route path="/config/direcciones-ip" element={<DireccionesIp />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;