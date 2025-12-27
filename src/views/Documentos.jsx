import React, { Component } from "react";

import Card from "../components/Card";
import TablaReutilizable from "../components/TablaReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import EtiquetaEstado from "../components/EtiquetaEstado";
import BotonReutilizable from "../components/BotonReutilizable";
import BotonDesplegable from "../components/BotonDesplegable";
import ModalReutilizable from "../components/ModalReutilizable";
import VisorDocumento from "../components/VisorDocumento";
import CampoFormulario from "../components/CampoFormulario";

// Datos simulados
const initialDocs = [
  {
    id: 1,
    numOficio: "OF-2025-001",
    titulo: "Acta constitutiva",
    estado: "Recibido",
    fechaLimite: "2025-11-10",
    tiempo: "5 días",
    archivo: "acta.pdf",
  },
  {
    id: 2,
    numOficio: "OF-2025-002",
    titulo: "Reporte 2024",
    estado: "Recibido",
    fechaLimite: "2025-11-03",
    tiempo: "Vencido",
    archivo: "reporte2024.pdf",
  },
  {
    id: 3,
    numOficio: "OF-2025-003",
    titulo: "Oficio de Presidencia",
    estado: "Pendiente",
    fechaLimite: "2025-10-25",
    tiempo: "1 día",
    archivo: "presidencia.pdf",
  },
];

class Documentos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentos: initialDocs,
      searchQuery: "",
      selectedDoc: null,

      // Modales
      isModalVerOpen: false,
      isModalEstadoOpen: false,
      isModalRespuestaOpen: false,

      comentarioRespuesta: "",
      estadoSeleccionado: "Recibido",
    };

    this.renderRow = this.renderRow.bind(this);
  }

  // Semaforo
  getSemaforoColor(doc) {
    const tiempo = (doc.tiempo || "").toLowerCase().trim();

    // vencido = rojo
    if (tiempo.includes("vencid")) {
      return "rojo";
    }

    // Extrae dias para ver si esta en tiempo
    const match = tiempo.match(/\d+/);
    if (!match) {
      return "verde";
    }

    const dias = parseInt(match[0], 10);
    if (dias > 2) {
      return "verde";
    } else if (dias >= 1) {
      return "amarillo";
    } else {
      return "rojo";
    }
  }

  setSearchQuery(value) {
    this.setState({ searchQuery: value });
  }

  // Acciones

  abrirVer(doc) {
    this.setState({
      selectedDoc: doc,
      isModalVerOpen: true,
    });
  }

  abrirEstado(doc) {
    this.setState({
      selectedDoc: doc,
      estadoSeleccionado: doc.estado,
      isModalEstadoOpen: true,
    });
  }

  abrirRespuesta(doc) {
    this.setState({
      selectedDoc: doc,
      comentarioRespuesta: "",
      isModalRespuestaOpen: true,
    });
  }

  cambiarEstadoDocumento() {
    this.setState((prev) => ({
      documentos: prev.documentos.map((d) =>
        d.id === prev.selectedDoc.id
          ? { ...d, estado: prev.estadoSeleccionado }
          : d
      ),
      isModalEstadoOpen: false,
    }));
  }

  enviarRespuesta() {
    console.log("Documento respondido:", {
      documento: this.state.selectedDoc,
      comentario: this.state.comentarioRespuesta,
    });

    this.setState({ isModalRespuestaOpen: false });
  }

  getFilteredDocs() {
    const { documentos, searchQuery } = this.state;

    return documentos.filter(
      (doc) =>
        doc.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.numOficio.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  renderRow(doc) {
    const colorSemaforo = this.getSemaforoColor(doc);

    return (
      <tr key={doc.id}>
        <td>{doc.numOficio}</td>
        <td>{doc.titulo}</td>
        <td>
          <EtiquetaEstado estatus={doc.estado} />
        </td>

        {/* Semaforo en tabla*/}
        <td className="tiempo-respuesta-cell">
          <span>{doc.tiempo}</span>
          <span
            className={`semaforo semaforo-${this.getSemaforoColor(doc)}`}
          ></span>
        </td>

        <td>
          <div className="actions-cell">
            <BotonReutilizable
              className="btn-action edit"
              onClick={() => this.abrirVer(doc)}
            >
              Ver
            </BotonReutilizable>

            <BotonReutilizable
              className="btn-action btn-blue"
              onClick={() => this.abrirEstado(doc)}
            >
              Estado
            </BotonReutilizable>

            <BotonReutilizable
              className="btn-action btn-gray"
              onClick={() => this.abrirRespuesta(doc)}
            >
              Respuesta
            </BotonReutilizable>
          </div>
        </td>
      </tr>
    );
  }

  render() {
    const { selectedDoc } = this.state;

    return (
      <main className="content-area">
        <section className="content-section">
          <h2 className="card-title">Gestión Documental</h2>

          <Card className="table-component">
            <div className="toolbar-container">
              <FiltroBusqueda
                value={this.state.searchQuery}
                onChange={(e) => this.setSearchQuery(e.target.value)}
                placeholder="Buscar por título o número de oficio..."
              />
            </div>

            {/* TABLA */}
            <TablaReutilizable
              columns={[
                "Número de Oficio",
                "Título",
                "Estado",
                "Tiempo de respuesta",
                "Acciones",
              ]}
              data={this.getFilteredDocs()}
              renderRow={this.renderRow}
            />
          </Card>
        </section>

        {/* Modal Visualización documento*/}
        <ModalReutilizable
          title="Visualización del documento"
          isOpen={this.state.isModalVerOpen}
          onClose={() => this.setState({ isModalVerOpen: false })}
          onAccept={() => this.setState({ isModalVerOpen: false })}
          acceptButtonText="Cerrar"
        >
          <VisorDocumento
            documentUrl={selectedDoc ? `/docs/${selectedDoc.archivo}` : null}
            documentTitle={selectedDoc ? selectedDoc.titulo : ""}
          />
        </ModalReutilizable>

        {/* Modal Cambiar estado del documento */}
        <ModalReutilizable
          title="Cambiar estado del documento"
          isOpen={this.state.isModalEstadoOpen}
          onClose={() => this.setState({ isModalEstadoOpen: false })}
          onAccept={() => this.cambiarEstadoDocumento()}
          acceptButtonText="Actualizar estado"
        >
          <CampoFormulario
            label="Estado del documento"
            isSelect
            value={this.state.estadoSeleccionado}
            onChange={(e) =>
              this.setState({ estadoSeleccionado: e.target.value })
            }
          >
            <option value="Recibido">Recibido</option>
            <option value="Devuelto">Devuelto</option>
          </CampoFormulario>
        </ModalReutilizable>

        {/* Modal enviar respuesta*/}
        <ModalReutilizable
          title="Entregar respuesta"
          isOpen={this.state.isModalRespuestaOpen}
          onClose={() => this.setState({ isModalRespuestaOpen: false })}
          onAccept={() => this.enviarRespuesta()}
          acceptButtonText="Enviar"
        >
          <p>
            <strong>Fecha de envío:</strong> {new Date().toLocaleDateString()}
          </p>
        </ModalReutilizable>
      </main>
    );
  }
}

export default Documentos;
