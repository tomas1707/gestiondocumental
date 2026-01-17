import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Sidebar from "./MenuLateral";
import Navbar from "./BarraNavegacion";
import ModalNotificaciones from "./ModalNotificaciones";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dropdown de notificaciones
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  // Modal "Ver todas"
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // NOTIFICACIONES SIMULADAS (luego vendrán de API)
  // ✅ Ahora incluyen: id + read
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Solicitud pendiente de aprobación", time: "2h", read: false },
    { id: 2, message: "El reporte diario está listo.", time: "4h", read: true },
    { id: 3, message: "Nueva tarea asignada por Admin.", time: "1d", read: false },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleNotificationMenu = () => {
    setIsNotifMenuOpen((prev) => !prev);
  };

  // Marcar 1 notificación como leída
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Abrir modal con todas las notificaciones
  const handleViewAllNotifications = () => {
    setIsNotifMenuOpen(false); // cerrar dropdown
    setIsNotifModalOpen(true); // abrir modal
  };

  // (Opcional) si quieres cerrar dropdown cuando abras el modal desde otro lado:
  const closeNotifMenu = () => setIsNotifMenuOpen(false);

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
          onViewAllNotifications={handleViewAllNotifications}
          onCloseNotifMenu={closeNotifMenu} // opcional
        />

        {/* Modal: todas las notificaciones */}
        <ModalNotificaciones
          isOpen={isNotifModalOpen}
          onClose={() => setIsNotifModalOpen(false)}
          notifications={notifications}
          onMarkAsRead={markNotificationAsRead}
          onMarkAllAsRead={markAllAsRead}
        />

        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
