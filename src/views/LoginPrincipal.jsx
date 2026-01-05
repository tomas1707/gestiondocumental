import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPrincipal.css";

import CampoInicioSesion from "../components/CampoInicioSesion";
import VentanaClaveModal from "../components/VentanaClaveModal";
import RegistroUsuario from "../components/RegistroUsuario";

import FondoInicioSesion from "../assets/fondoInicioSesion.jpg";
import LogoTlahuapan from "../assets/logo_tlahuapan.png";

const LoginPrincipal = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mantenerSesion, setMantenerSesion] = useState(false);

  const [modalClaveOpen, setModalClaveOpen] = useState(false);
  const [clave, setClave] = useState("");
  const [mensajeClave, setMensajeClave] = useState(null);
  const [registroVisible, setRegistroVisible] = useState(false);

  const navigate = useNavigate();

  const usuariosSimulados = [
    { usuario: "admin", password: "123", ruta: "/Usuarios" },
    { usuario: "user", password: "123", ruta: "/dashboard" },
  ];

  const onLogin = (e) => {
    e.preventDefault();
    if (!usuario || !password) {
      alert("Completa los campos");
      return;
    }

    const encontrado = usuariosSimulados.find(
      (u) => u.usuario === usuario && u.password === password
    );

    if (!encontrado) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    navigate(encontrado.ruta);
  };

  const confirmarClave = () => {
    if (clave !== "12345") {
      setMensajeClave({
        tipo: "error",
        texto: "Clave incorrecta, vuelve a intentar",
      });
      return;
    }

    setMensajeClave({
      tipo: "ok",
      texto: "Clave verificada correctamente",
    });

    setTimeout(() => {
      setModalClaveOpen(false);
      setRegistroVisible(true);
      setClave("");
      setMensajeClave(null);
    }, 700);
  };

  return (
    <div
      className="login-principal"
      style={{ backgroundImage: `url(${FondoInicioSesion})` }}
    >
      <div className="login-card">
        <div className="logo-button" onClick={() => setModalClaveOpen(true)}>
          <img src={LogoTlahuapan} alt="Logo" className="logo" />
        </div>

        <form onSubmit={onLogin}>
          <CampoInicioSesion
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
          />

          <CampoInicioSesion
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />

          <button className="btn-login" type="submit">
            INICIAR SESIÓN
          </button>

          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={mantenerSesion}
              onChange={() => setMantenerSesion(!mantenerSesion)}
            />
            <label>Mantener sesión iniciada</label>
          </div>
        </form>
      </div>

      <VentanaClaveModal
        isOpen={modalClaveOpen}
        onClose={() => {
          setModalClaveOpen(false);
          setMensajeClave(null);
          setClave("");
        }}
        clave={clave}
        setClave={setClave}
        onConfirm={confirmarClave}
        mensaje={mensajeClave}
      />

      <RegistroUsuario
        isOpen={registroVisible}
        onClose={() => setRegistroVisible(false)}
        onRegister={(data) => {
          console.log("Usuario registrado:", data);
          setRegistroVisible(false);
        }}
      />
    </div>
  );
};

export default LoginPrincipal;
