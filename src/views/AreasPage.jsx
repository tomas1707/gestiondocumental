import React, { useState } from "react";
import { useAreas } from "../hooks/useAreas";
import ErrorModal from "../components/ErrorModal";

const AreasManager = () => {
  const { areas, loading, error, createArea, deleteArea } = useAreas();
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [errorModal, setErrorModal] = useState(null);

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;

    try {
      await createArea(nuevoNombre);
      setNuevoNombre("");
    } catch (err) {
      setErrorModal(err.message);
    }
  };

  const cerrarModal = () => {
    setErrorModal(null);
  };

  if (loading) return <p>Cargando áreas...</p>;

  return (
    <div>
      <h2>Gestión de Áreas</h2>

      {/* Modal de error */}
      <ErrorModal mensaje={errorModal} onClose={cerrarModal} />

      {/* Formulario */}
      <form onSubmit={handleGuardar}>
        <input
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nombre de la nueva área"
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista */}
      <ul>
        {areas.map((area) => (
          <li key={area.id}>
            {area.nombre_area}
            <button onClick={() => deleteArea(area.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreasManager;
