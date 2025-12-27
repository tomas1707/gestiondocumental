// src/components/FormularioUsuario.jsx
import React from 'react';
import CampoFormulario from './CampoFormulario';

// Datos de adscripción estáticos para el select, podrían venir de props o un store
const adscripciones = [
  "Presidencia municipal",
  "Contraloria",
  "Ley de Archivo",
  "Oficialía de Partes",
  "Turismo y Cultura",
  "Ninguno"
];

// Reutilizable para agregar y editar
const FormularioUsuario = ({ userData, onInputChange, isEdit = false }) => {
  // 'userData' contendrá el estado del formulario (nombre, correo, etc.)
  
  return (
    <>
      <CampoFormulario 
        label="Nombre completo" 
        placeholder="Nombre completo" 
        name="nombre" 
        value={userData.nombre || ''} 
        onChange={onInputChange} 
        required 
      />
      <CampoFormulario 
        label="Número de trabajador" 
        placeholder="Número de trabajador" 
        name="numTrabajador" 
        value={userData.numTrabajador || ''} 
        onChange={onInputChange} 
        required 
      />
      <CampoFormulario 
        label="Correo electrónico" 
        type="email" 
        placeholder="Correo electrónico" 
        name="correo" 
        value={userData.correo || ''} 
        onChange={onInputChange} 
        required 
      />
      <CampoFormulario 
        label="Usuario" 
        placeholder="Usuario" 
        name="usuario" 
        value={userData.usuario || ''} 
        onChange={onInputChange} 
        required 
      />
      
      {/* El campo de Contraseña solo se muestra en el modal de Agregar */}
      {!isEdit && (
        <CampoFormulario 
          label="Contraseña" 
          type="password" 
          placeholder="Contraseña" 
          name="password" 
          value={userData.password || ''} 
          onChange={onInputChange} 
          required 
        />
      )}
      
      <CampoFormulario 
        label="Adscripción"
        isSelect
        name="adscripcion"
        value={userData.adscripcion || ''}
        onChange={onInputChange}
      >
        <option value="" disabled>Adscripción</option>
        {adscripciones.map(adsc => (
          <option key={adsc} value={adsc}>{adsc}</option>
        ))}
      </CampoFormulario>
    </>
  );
};

export default FormularioUsuario;