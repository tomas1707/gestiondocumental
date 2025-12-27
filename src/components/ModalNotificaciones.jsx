import React from "react";
import ModalReutilizable from "./ModalReutilizable";
import BotonReutilizable from "./BotonReutilizable";

/**
 * ModalCentroNotificaciones
 *
 * Muestra las notificaciones dinámicamente según los datos recibidos desde BD o API.
 * Props:
 *  - isOpen: controla la visibilidad del modal
 *  - onClose: función para cerrar el modal
 *  - notificaciones: array de objetos [{ id, remitente, mensaje, tiempo, leida, acciones }]
 *  - onAccion: callback opcional para manejar eventos (aceptar, rechazar, etc.)
 */
const ModalCentroNotificaciones = ({ isOpen, onClose, notificaciones = [], onAccion }) => {
  return (
    <ModalReutilizable
      id="modalNotificaciones"
      title="Centro de Notificaciones"
      isOpen={isOpen}
      onClose={onClose}
      onAccept={onClose}
      acceptButtonText="Cerrar"
    >
      <div className="notifications-container">
        {notificaciones.length === 0 ? (
          <p className="no-notifications">No hay notificaciones nuevas.</p>
        ) : (
          notificaciones.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${!notif.leida ? "unread" : ""}`}
            >
              <p>
                <strong>{notif.remitente}:</strong> {notif.mensaje}
              </p>

              {notif.acciones?.includes("aceptar") && (
                <BotonReutilizable
                  className="btn-small status-active"
                  onClick={() => onAccion?.("aceptar", notif.id)}
                >
                  Aceptar
                </BotonReutilizable>
              )}
              {notif.acciones?.includes("rechazar") && (
                <BotonReutilizable
                  className="btn-small btn-danger"
                  onClick={() => onAccion?.("rechazar", notif.id)}
                >
                  Rechazar
                </BotonReutilizable>
              )}

              <span className="notification-time">{notif.tiempo}</span>
            </div>
          ))
        )}
      </div>
    </ModalReutilizable>
  );
};

export default ModalCentroNotificaciones;
