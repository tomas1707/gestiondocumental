import React, { Component } from "react";

import Card from "../components/Card";
import TablaReutilizable from "../components/TablaReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import BotonReutilizable from "../components/BotonReutilizable";
import ModalReutilizable from "../components/ModalReutilizable";
import FormularioClasificacion from "../components/FormularioClasificacion";
import EtiquetaEstado from "../components/EtiquetaEstado";
import CampoFormulario from "../components/CampoFormulario";

// ---------------- DATOS SIMULADOS ----------------
const sugerenciasMock = [
  {
    id: 1,
    titulo: "OF-2025-001 — Informe de obras trimestral",
    area: "Obras Públicas",
    clasif: "OBP-2022-034 C",
    carpeta: "Archivador B / Carpeta 2025",
    valor: "Administrativo",
  },
  {
    id: 2,
    titulo: "OF-2025-002 — Presupuesto anual de mantenimiento",
    area: "Tesorería Municipal",
    clasif: "TES-2023-101 C",
    carpeta: "Archivador D / Carpeta 2025",
    valor: "Fiscal",
  },
  {
    id: 3,
    titulo: "OF-2025-003 — Acta de reunión de cabildo",
    area: "Secretaría del Ayuntamiento",
    clasif: "SEC-2023-021 S",
    carpeta: "Archivador A / Carpeta 2024",
    valor: "Histórico",
  },
];

class LeyArchivo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sugerencias: sugerenciasMock,
      searchQuery: "",

      selectedDoc: null,

      // Modales
      isModalConfirmOpen: false,
      isModalCambiarOpen: false,
      isModalClasificacionOpen: false,

      mensajeConfirmacion: "",
      nuevaClasificacion: "",
    };

    this.renderRow = this.renderRow.bind(this);
  }

  // ---------------- FILTRO ----------------
  setSearchQuery(value) {
    this.setState({ searchQuery: value });
  }

  getFilteredRows() {
    const { sugerencias, searchQuery } = this.state;

    return sugerencias.filter(s =>
      s.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // ---------------- ACCIONES ----------------
  abrirConfirmar(doc) {
    this.setState({
      selectedDoc: doc,
      mensajeConfirmacion:
        `¿Desea guardar la clasificación sugerida para: \n${doc.titulo}?`,
      isModalConfirmOpen: true,
    });
  }

  abrirCambiar(doc) {
    this.setState({
      selectedDoc: doc,
      nuevaClasificacion: doc.clasif,
      isModalCambiarOpen: true,
    });
  }

  abrirNuevaClasificacion() {
    this.setState({
      isModalClasificacionOpen: true,
    });
  }

  confirmarUbicacion() {
    console.log("Clasificación confirmada:", this.state.selectedDoc);
    this.setState({ isModalConfirmOpen: false });
  }

  guardarNuevaUbicacion() {
    this.setState(prev => ({
      sugerencias: prev.sugerencias.map(s =>
        s.id === prev.selectedDoc.id
          ? { ...s, clasif: prev.nuevaClasificacion }
          : s
      ),
      isModalCambiarOpen: false,
    }));
  }

  // ---------------- FILA TABLA ----------------
  renderRow(item) {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.titulo}</td>
        <td>{item.area}</td>
        <td>{item.clasif}</td>
        <td>{item.carpeta}</td>
        <td>{item.valor}</td>
        <td>
          <div className="actions-cell">
            <BotonReutilizable
              onClick={() => this.abrirConfirmar(item)}
              className="btn-action btn-blue"
            >
              Guardar
            </BotonReutilizable>

            <BotonReutilizable
              onClick={() => this.abrirCambiar(item)}
              className="btn-action btn-gray"
            >
              Cambiar
            </BotonReutilizable>
          </div>
        </td>
      </tr>
    );
  }

  // ---------------- RENDER ----------------
  render() {
    return (
      <main className="content-area">
        <section className="content-section">
            <h2 className="card-title">Ley de Archivo</h2>

          {/* BOTÓN AGREGAR CLASIFICACIÓN */}
          <div className="management-buttons-container">
            <BotonReutilizable
              onClick={() => this.abrirNuevaClasificacion()}
              className="btn-add-user"
            >
              Agregar clasificación
            </BotonReutilizable>
          </div>

          {/* BUSCADOR */}
          <FiltroBusqueda
            value={this.state.searchQuery}
            onChange={(e) => this.setSearchQuery(e.target.value)}
            placeholder="Buscar documento o código..."
          />

          {/* TABLA */}
          <Card>
            <TablaReutilizable
              columns={[
                "No.",
                "Título del documento",
                "Área remitente",
                "Clasificación sugerida",
                "Carpeta sugerida",
                "Valor documental",
                "Acción",
              ]}
              data={this.getFilteredRows()}
              renderRow={this.renderRow}
            />
          </Card>

        </section>

        {/* MODAL CONFIRMAR */}
        <ModalReutilizable
          title="Confirmar ubicación"
          isOpen={this.state.isModalConfirmOpen}
          onClose={() => this.setState({ isModalConfirmOpen: false })}
          onAccept={() => this.confirmarUbicacion()}
          acceptButtonText="Confirmar"
        >
          <p>{this.state.mensajeConfirmacion}</p>
        </ModalReutilizable>

        {/* MODAL CAMBIAR UBICACIÓN */}
        <ModalReutilizable
          title="Cambiar ubicación"
          isOpen={this.state.isModalCambiarOpen}
          onClose={() => this.setState({ isModalCambiarOpen: false })}
          onAccept={() => this.guardarNuevaUbicacion()}
          acceptButtonText="Guardar"
        >
          <CampoFormulario
            label="Selecciona nueva clasificación"
            isSelect
            value={this.state.nuevaClasificacion}
            onChange={(e) => this.setState({ nuevaClasificacion: e.target.value })}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="OBP-2022-034 C">OBP-2022-034 C — Obras Públicas</option>
            <option value="TES-2023-101 C">TES-2023-101 C — Tesorería Municipal</option>
            <option value="SEC-2023-021 S">SEC-2023-021 S — Secretaría del Ayuntamiento</option>
          </CampoFormulario>
        </ModalReutilizable>

        {/* MODAL NUEVA CLASIFICACIÓN */}
        <ModalReutilizable
          title="Nueva Clasificación"
          isOpen={this.state.isModalClasificacionOpen}
          onClose={() => this.setState({ isModalClasificacionOpen: false })}
          onAccept={() => this.setState({ isModalClasificacionOpen: false })}
          acceptButtonText="Cerrar"
        >
          <FormularioClasificacion />
        </ModalReutilizable>

      </main>
    );
  }
}

export default LeyArchivo;
