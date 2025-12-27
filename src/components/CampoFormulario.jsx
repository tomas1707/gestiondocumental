import React, { useState } from "react";
import "../styles/CampoFormulario.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const CampoFormulario = ({
label,
type = "text",
value,
onChange,
placeholder,
required = false,
children,
isSelect = false,
...props
}) => {
const [mostrarPassword, setMostrarPassword] = useState(false);

const InputElement = isSelect ? "select" : "input";

const inputType =
type === "password"
? mostrarPassword
? "text"
: "password"
: type;

return (
<label className="field" style={{ position: "relative" }}>
{label}

  <InputElement
    className="input"
    type={inputType}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    {...props}
  >
    {children}
  </InputElement>

  {type === "password" && (
   <span
  className="password-icon-formulario"
  onClick={() => setMostrarPassword(!mostrarPassword)}
>
  {mostrarPassword ? <FiEye /> : <FiEyeOff />}
</span>

  )}
</label>

);
};

export default CampoFormulario;