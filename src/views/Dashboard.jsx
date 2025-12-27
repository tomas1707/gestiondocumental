import React, { useState } from "react";
import "../styles/Dashboard.css";
import Card from "../components/Card";
import IndicadorCircular from "../components/IndicadorCircular";
import GraficaBarrasHorizontal from "../components/GraficaBarrasHorizontal";
import DashboardFiltros from "../components/DashboardFiltros";
import ModalDashboard from "../components/ModalDashboard";

const Dashboard = () => {
  const [anio, setAnio] = useState("2025");
  const [mes, setMes] = useState("3");

  // Nuevo estado del modal
  const [modalOpen, setModalOpen] = useState(false);

  const actualizarDashboard = () => {
    console.log("Actualizar dashboard con:", anio, mes);
  };

  return (
    <div className="content-area">
      
      {/* FILTROS */}
      <DashboardFiltros
        anio={anio}
        mes={mes}
        setAnio={setAnio}
        setMes={setMes}
        onActualizar={actualizarDashboard}
      />

      <div className="dashboard-container">

        {/* TARJETA IZQUIERDA */}
        <Card title="Indicadores de Desempeño" className="circulos-card">
          <p className="periodo-indicadores">Datos de Marzo 2025</p>

          <div className="indicadores-contenedor">
            <IndicadorCircular valor={120} color="green" porcentaje={85} titulo="DOCUMENTOS EN TIEMPO" />
            <IndicadorCircular valor={40} color="yellow" porcentaje={50} titulo="PRÓXIMO A VENCER" />
            <IndicadorCircular valor={15} color="red" porcentaje={15} titulo="DOCUMENTOS VENCIDOS" />
          </div>
        </Card>

        {/* TARJETA DERECHA */}
        <Card title="Correspondencia de Casos" className="barras-card">
          <GraficaBarrasHorizontal onBarClick={() => setModalOpen(true)} />
        </Card>

      </div>

      {/* MODAL */}
      <ModalDashboard
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
};

export default Dashboard;
