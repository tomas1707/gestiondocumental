import React, { useState } from "react";
import Card from "../components/Card";
import CampoFormulario from "../components/CampoFormulario";
import BotonReutilizable from "../components/BotonReutilizable";
import '../styles/NotificacionConexionBD.css';

const Configuracion = () => {
  // Estado correo
  const [correoRemitente, setCorreoRemitente] = useState("");
  const [password, setPassword] = useState("");
  const [servidorSmtp, setServidorSmtp] = useState("");
  const [puerto, setPuerto] = useState("");

  // Estado base de datos
  const [dominio, setDominio] = useState("");
  const [servicio, setServicio] = useState("");
  const [basedatos, setBaseDatos] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const enviarCorreo = () => {
    console.log("Configuración correo:", { correoRemitente, password, servidorSmtp, puerto });
  };

  const aceptarBaseDatos = () => {
    console.log("Configuración BD:", { dominio, servicio, basedatos, usuario, contrasena });
  };

  return (
    <div className="content-area">
      <div className="container">
        <h2>Configuración de Notificaciones del Sistema Documental</h2>

        <div className="top-grid">
          {/* Card para Envío por correo */}
          <Card className="section">
            <h3>Envío por correo</h3>
            <CampoFormulario
              label="Correo remitente del sistema"
              type="email"
              placeholder="notificaciones@gmail.com"
              value={correoRemitente}
              onChange={(e) => setCorreoRemitente(e.target.value)}
            />
            <CampoFormulario
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CampoFormulario
              label="Servidor SMTP"
              placeholder="smtp.gmail.com"
              value={servidorSmtp}
              onChange={(e) => setServidorSmtp(e.target.value)}
            />
            <CampoFormulario
              label="Puerto"
              placeholder="587"
              value={puerto}
              onChange={(e) => setPuerto(e.target.value)}
            />
            <div className="row">
              <BotonReutilizable onClick={enviarCorreo}>Guardar</BotonReutilizable>
            </div>
          </Card>

          {/* Card para Conexión a Base de Datos */}
          <Card className="section">
            <h3>Conexión a Base de Datos</h3>
            <CampoFormulario
              label="Dominio"
              placeholder="midominio.com"
              value={dominio}
              onChange={(e) => setDominio(e.target.value)}
            />
            <CampoFormulario
              label="Servicio"
              placeholder="MySQL"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
            />
             <CampoFormulario
              label="Puerto"
              placeholder=" "
              value={puerto}
              onChange={(e) => setPuerto(e.target.value)}
            />
            <CampoFormulario
              label="Base de Datos"
              placeholder="nombre_base_de_datos"
              value={basedatos}
              onChange={(e) => setBaseDatos(e.target.value)}
            />
            <CampoFormulario
              label="Usuario"
              placeholder="admin"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <CampoFormulario
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <div className="row">
              <BotonReutilizable onClick={aceptarBaseDatos}>Guardar</BotonReutilizable>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
