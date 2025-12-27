// src/components/FormularioPrivilegios.jsx
import React from 'react';
import CampoFormulario from './CampoFormulario';

const FormularioPrivilegios = ({ privilegioData, onInputChange }) => {
  const privilegios = ["Administrador", "Editor", "Visualizador", "Ninguno"];
  
  return (
    <>
      <CampoFormulario 
        label="Seleccionar Privilegio"
        isSelect
        name="privilegio"
        value={privilegioData.privilegio || ''}
        onChange={onInputChange}
        required
      >
        <option value="" disabled>Selecciona un nivel de privilegio</option>
        {privilegios.map(priv => (
          <option key={priv} value={priv}>{priv}</option>
        ))}
      </CampoFormulario>
      
      <p className="note">Esta acción aplicará el privilegio al seleccionar el usuario de la tabla. </p>
    </>
  );
};

export default FormularioPrivilegios;