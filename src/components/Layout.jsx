import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Sidebar from "./MenuLateral";
import Navbar from "./BarraNavegacion";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  // Notificaciones leídas
  const [notificationsRead, setNotificationsRead] = useState(false);

  // NOTIFICACIONES SIMULADAS (luego vendrán de API)
  const [notifications, setNotifications] = useState([
    { message: "Solicitud pendiente de aprobación", time: "2h" },
    { message: "El reporte diario está listo.", time: "4h" },
    { message: "Nueva tarea asignada por Admin.", time: "1d" },
  ]);

  // Cuando se abre el menú → marcar como leídas
  const toggleNotificationMenu = () => {
    setIsNotifMenuOpen(prev => {
      const newState = !prev;

      if (newState === true) {
        setNotificationsRead(true);
      }

      return newState;
    });
  };

  // Si llegan nuevas notificaciones → bolita vuelve a aparecer
  useEffect(() => {
    if (notifications.length > 0) {
      setNotificationsRead(false);
    }
  }, [notifications]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className={`layout-container ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar isOpen={isSidebarOpen} />

      <div className="main-area">
        <Navbar
          onToggleSidebar={toggleSidebar}
          userName="Usuario Ejemplo"
          ipAddress="192.168.0.5"
          groupName="grupotlahuapan"
          
          notifications={notifications}
          notifMenuOpen={isNotifMenuOpen}
          toggleNotificationMenu={toggleNotificationMenu}
          notificationsRead={notificationsRead}
        />

        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
