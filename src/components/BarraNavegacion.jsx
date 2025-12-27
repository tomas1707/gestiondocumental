import React from "react";
import "../styles/BarraNavegacion.css";

// Importar imágenes desde src/assets
import menuIcon from "../assets/menu.png";
import userIcon from "../assets/usuario.png";
import notifIcon from "../assets/notificacion.png";
import IconoIP from "../assets/ip.png";
import IconoGrupo from "../assets/grupotlahuapan.png";

// Componente para cada notificación
const NotificationItem = ({ message, time }) => (
  <div className="notification-item">
    <p className="notification-message">{message}</p>
    <span className="notification-time">{time}</span>
  </div>
);

function Navbar({
  onToggleSidebar,
  userName,
  notifications = [],
  notifMenuOpen,
  toggleNotificationMenu,
  onViewAllNotifications,
  notificationsRead,
  ipAddress,
  groupName
}) {

  const unreadCount = notifications.length;

  const handleViewAllClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleNotificationMenu();
    onViewAllNotifications();
  };

  return (
    <header className="navbar">

      {/* MENU */}
      <div className="header-left-group">
        <img
          src={menuIcon}
          alt="Menú"
          className="icon-control-img"
          onClick={onToggleSidebar}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* CENTRO: IP + GRUPO */}
      <div className="center-items">
        <div className="right-item">
          <img src={IconoIP} alt="IP" className="icon-control-img" />
          <span>{ipAddress}</span>
        </div>

        <div className="right-item">
          <img src={IconoGrupo} alt="Grupo" className="icon-control-img" />
          <span>{groupName}</span>
        </div>
      </div>

      {/* USUARIO + NOTIFICACIONES */}
      <div className="user-info">

        <div className="profile-info-container">
          <img src={userIcon} alt="Usuario" className="icon-control-img" />
          <span className="user-name">{userName}</span>
        </div>

        {/* NOTIFICACIONES */}
        <div
          className="notification-dropdown-container"
          onClick={toggleNotificationMenu}
        >
          <img
            src={notifIcon}
            alt="Notificaciones"
            className="icon-control-img notification-icon-img"
          />

          {/* BADGE — solo si hay nuevas notificaciones y no está leído */}
         {unreadCount > 0 && !notifMenuOpen && !notificationsRead && (
  <span className="notification-badge">{unreadCount}</span>
)}

          {/* MENÚ DESPLEGABLE */}
          <div
            className={`dropdown-menu notification-menu ${
              notifMenuOpen ? "visible" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="dropdown-title">
              Notificaciones recientes ({unreadCount})
            </p>

            <div className="notification-list-scrollable">
              {unreadCount > 0 ? (
                notifications.slice(0, 5).map((notif, index) => (
                  <NotificationItem
                    key={index}
                    message={notif.message}
                    time={notif.time}
                  />
                ))
              ) : (
                <div className="dropdown-item notification-empty">
                  No hay notificaciones nuevas.
                </div>
              )}
            </div>

            <a
              href="#"
              className="dropdown-item view-all"
              onClick={handleViewAllClick}
            >
              Ver todas las notificaciones
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
