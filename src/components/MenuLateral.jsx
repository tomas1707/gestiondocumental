import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/MenuLateral.css";

// Importaciones de imágenes 
import IconoLogo from "../assets/logo.png";
import IconoUsuarios from "../assets/usuarios.png";
import IconoDashboard from "../assets/dashboard.png";
import IconoDocumentos from "../assets/documentos.png";
import IconoOrganigrama from "../assets/organigrama.png";
import IconoDispersion from "../assets/enviodocumentos.png"; 
import IconoLeyArchivo from "../assets/leyarchivo.png";
import IconoConfiguracion from "../assets/configuracion.png";
import IconoCerrarSesion from "../assets/cerrarsesion.png";

function Sidebar({ isOpen }) {
  const location = useLocation();

  // Estado para mostrar / ocultar el submenu de configuración
const [configOpen, setConfigOpen] = useState(false);

// Si el sidebar se colapsa, cerrar submenu
useEffect(() => {
if (!isOpen) setConfigOpen(false);
}, [isOpen]);

  return (
    <nav className={`sidebar sidebar-off-canvas ${!isOpen ? "collapsed" : ""}`} id="sidebar">
      <ul className="nav">

        <li className="nav-item nav-category tlahuapan-item">
          <div className="tlahuapan-logo-text">
            <img
              // Ruta modificada
              src={IconoLogo}
              alt="Logo"
              className="tlahuapan-logo"
            />
            {isOpen && <span className="tlahuapan-text">TLAHUAPAN</span>}
          </div>
        </li>

        <li className={`nav-item ${location.pathname === "/usuarios" ? "active" : ""}`}>
          <Link className="nav-link" to="/usuarios">
            <span className="icon-bg">
              {/*  Ruta modificada */}
              <img src={IconoUsuarios} className="sidebar-icon-img" alt="Usuarios" />
            </span>
            {isOpen && <span className="menu-title">Usuarios</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
          <Link className="nav-link" to="/dashboard">
            <span className="icon-bg">
              {/*  Ruta modificada */}
              <img src={IconoDashboard} className="sidebar-icon-img" alt="Dashboard" />
            </span>
            {isOpen && <span className="menu-title">Dashboard</span>}
          </Link>
        </li>

          <li className={`nav-item ${location.pathname === "/documentos" ? "active" : ""}`}>
          <Link className="nav-link" to="/documentos">
            <span className="icon-bg">
              {/*  Ruta modificada */}
              <img src={IconoDocumentos} className="sidebar-icon-img" alt="Documentos" />
            </span>
            {isOpen && <span className="menu-title">Documentos</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/organigrama" ? "active" : ""}`}>
          <Link className="nav-link" to="/organigrama">
            <span className="icon-bg">
              {/*  Ruta modificada */}
              <img src={IconoOrganigrama} className="sidebar-icon-img" alt="Organigrama" />
            </span>
            {isOpen && <span className="menu-title">Organigrama</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/dispersion" ? "active" : ""}`}>
          <Link className="nav-link" to="/dispersion">
            <span className="icon-bg">
              {/*  Ruta modificada */}
              <img src={IconoDispersion} className="sidebar-icon-img" alt="Dispersión" />
            </span>
            {isOpen && <span className="menu-title">Dispersión</span>}
          </Link>
        </li>

        <li className={`nav-item ${location.pathname === "/leyarchivo" ? "active" : ""}`}>
          <Link className="nav-link" to="/leyarchivo">
            <span className="icon-bg">
              {/*  Ruta modificada */}
              <img src={IconoLeyArchivo} className="sidebar-icon-img" alt="Ley de Archivo" />
            </span>
            {isOpen && <span className="menu-title">Ley de Archivo</span>}
          </Link>
        </li>

        {/* CONFIGURACIÓN CON SUBMENU */}
<li className={`nav-item ${location.pathname.includes("/config") ? "active" : ""}`}>
  <div 
    className="nav-link submenu-toggle"
    onClick={() => setConfigOpen(!configOpen)}
    style={{ cursor: "pointer" }}
  >
    <span className="icon-bg">
      <img src={IconoConfiguracion} className="sidebar-icon-img" alt="Configuración" />
    </span>

    {isOpen && (
      <>
        <span className="menu-title">Configuración</span>
        
      </>
    )}
  </div>

 {/* SUBMENU */}
{configOpen && isOpen && (
  <ul className="submenu">
    <li
      className={`submenu-item ${
        location.pathname === "/config/notificacion-conexion" ? "active" : ""
      }`}
    >
      <Link className="nav-link" to="/config/notificacion-conexion">
        Notificaciones y conexión a BD
      </Link>
    </li>

    <li
      className={`submenu-item ${
        location.pathname === "/config/direcciones-ip" ? "active" : ""
      }`}
    >
      <Link className="nav-link" to="/config/direcciones-ip">
        Direcciones IP
      </Link>
    </li>
  </ul>
)}
</li>


        <li className={`nav-item ${location.pathname === "/login" ? "active" : ""}`}>
          <Link className="nav-link" to="/login">
            <span className="icon-bg">
              <img src={IconoCerrarSesion} className="sidebar-icon-img" alt="Cerrar Sesión" />
            </span>
            {isOpen && <span className="menu-title">Cerrar Sesión</span>}
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;