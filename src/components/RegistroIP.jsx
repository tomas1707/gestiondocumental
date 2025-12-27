import React from "react";
import ModalReutilizable from "./ModalReutilizable";
import CampoFormulario from "./CampoFormulario";

const RegistroIP = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = React.useState({
    adscripcion: "",
    ip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccept = () => {
    if (!formData.adscripcion || !formData.ip) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onRegister(formData);

    setFormData({
      adscripcion: "",
      ip: "",
    });

    onClose();
  };

  return (
    <ModalReutilizable
      title="Registrar Dirección IP"
      isOpen={isOpen}
      onClose={onClose}
      onAccept={handleAccept}
      acceptButtonText="Guardar"
      cancelButtonText="Cancelar"
    >
      <CampoFormulario
        label="Adscripción"
        placeholder="Ej: Sistemas"
        name="adscripcion"
        value={formData.adscripcion}
        onChange={handleInputChange}
        required
      />

      <CampoFormulario
        label="Dirección IP"
        placeholder="Ej: 192.168.1.10"
        name="ip"
        value={formData.ip}
        onChange={handleInputChange}
        required
      />
    </ModalReutilizable>
  );
};

export default RegistroIP;
