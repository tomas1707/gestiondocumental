import React from 'react';
import '../styles/ModalReutilizable.css';

const ModalReutilizable = ({ 
  id, 
  title, 
  children, 
  formId, 
  isOpen, 
  onClose, 
  onAccept, 
  acceptButtonText = 'Aceptar',
  className = "",
  hideFooter = false   // <-- NUEVA PROP
}) => {

  if (!isOpen) return null;

  return (
    <div className="modal" id={id} aria-hidden={!isOpen}>
      <div className={`modal-card ${className}`} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`}>
        
        <header className="modal-head">
          <h3 id={`${id}-title`}>{title}</h3>
          <button className="icon-btn close-red" onClick={onClose} aria-label="Cerrar">x</button>
        </header>

        <div className="modal-body">
          <form id={formId}>
            {children}
          </form>
        </div>

        {/* ⬇️ SI hideFooter ES TRUE, NO SE RENDERIZA EL FOOTER */}
        {!hideFooter && (
          <footer className="modal-foot">
            <button 
              className="btn btn-primary" 
              type="submit" 
              form={formId} 
              onClick={(e) => { e.preventDefault(); onAccept(); }}
            >
              {acceptButtonText}
            </button>
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          </footer>
        )}

      </div>
    </div>
  );
};

export default ModalReutilizable;
