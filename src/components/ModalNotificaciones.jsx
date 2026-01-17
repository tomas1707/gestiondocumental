import React from "react";
import ModalReutilizable from "./ModalReutilizable";
import "../styles/NotificacionesModal.css";

const ModalNotificaciones = ({
  isOpen,
  onClose,
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <ModalReutilizable
      id="modal-notificaciones"
      title={`Todas las notificaciones (${notifications.length})`}
      isOpen={isOpen}
      onClose={onClose}
      hideFooter={true}
    >
      <div className="notif-modal-header">
        <div className="notif-subtitle">
          {unreadCount > 0 ? (
            <span>
              <strong>{unreadCount}</strong> sin leer
            </span>
          ) : (
            <span>Todo está leído</span>
          )}
        </div>

        <button
          type="button"
          className="notif-action-btn"
          onClick={() => onMarkAllAsRead && onMarkAllAsRead()}
          disabled={unreadCount === 0}
          title="Marcar todas como leídas"
        >
          Marcar todas como leídas
        </button>
      </div>

      <div className="notif-list">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <button
              key={n.id ?? `${n.message}-${n.time}`}
              type="button"
              className={`notif-item ${n.read ? "read" : "unread"}`}
              onClick={() => onMarkAsRead && onMarkAsRead(n.id)}
              title={n.read ? "Leída" : "Marcar como leída"}
            >
              <div className="notif-item-left">
                {!n.read && <span className="notif-dot" />}
                <div className="notif-text">
                  <div className="notif-message">{n.message}</div>
                  <div className="notif-time">{n.time}</div>
                </div>
              </div>

              <div className={`notif-status ${n.read ? "status-read" : "status-new"}`}>
                {n.read ? "Leída" : "Nueva"}
              </div>
            </button>
          ))
        ) : (
          <div className="notif-empty">No hay notificaciones.</div>
        )}
      </div>

      <div className="notif-footer">
        <button className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </ModalReutilizable>
  );
};

export default ModalNotificaciones;
