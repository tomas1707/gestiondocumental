import React, { Component } from "react";
import Card from "../components/Card";
import TablaReutilizable from "../components/TablaReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import BotonReutilizable from "../components/BotonReutilizable";
import ModalReutilizable from "../components/ModalReutilizable";
import CampoFormulario from "../components/CampoFormulario";
import ArbolOrganigrama from "../components/ArbolOrganigrama";

// Datos simulados
const organigramasMock = [
  {
    id: 1,
    titulo: "Organigrama 2024–2027",
    fechaSolicitud: "05-01-2025",
    fechaAutorizacion: "Pendiente",
  },
  {
    id: 2,
    titulo: "Organigrama 2021–2024",
    fechaSolicitud: "01-06-2021",
    fechaAutorizacion: "10-08-2021",
  },
  {
    id: 3,
    titulo: "Organigrama 2018–2021",
    fechaSolicitud: "10-05-2018",
    fechaAutorizacion: "15-07-2018",
  },
  {
    id: 4,
    titulo: "Organigrama 2015–2018",
    fechaSolicitud: "15-04-2015",
    fechaAutorizacion: "01-07-2015",
  },
];

const areasMock = [
  { area: "Presidencia Municipal", nivel: 1, superior: "-" },
  {
    area: "Dirección de Obras Públicas",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Dirección de Desarrollo Urbano",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Dirección de Desarrollo Social",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Dirección de Cultura y Deporte",
    nivel: 2,
    superior: "Presidencia Municipal",
  },
  {
    area: "Coordinación de Programas Sociales",
    nivel: 3,
    superior: "Dirección de Desarrollo Social",
  },
  {
    area: "Departamento de Atención Ciudadana",
    nivel: 3,
    superior: "Dirección de Desarrollo Social",
  },
];

class Organigrama extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organigramas: organigramasMock,
      gestionAreas: areasMock,

      searchQuery: "",
      selectedOrg: null,

      // Control de "pantallas"
      mostrarGestion: false,

      // Modales
      isModalCrearOpen: false,
      isModalVerOpen: false,
      isModalInsertarAreaOpen: false,
      isModalAutorizarOpen: false,

      // modal editar área
      isModalEditarAreaOpen: false,
      areaEditando: null, // { ...area, index }

       // Modal eliminar área
      isModalEliminarAreaOpen: false,
      areaAEliminar: null, // { ...area, index }

      // Formularios 
      nuevoTitulo: "",
      nuevaArea: "",
      nuevoNivel: "",
      nuevaSuperior: "",
    };

    this.renderOrganigramaRow = this.renderOrganigramaRow.bind(this);
    this.renderAreaRow = this.renderAreaRow.bind(this);
    this.regresarAOrganigrama = this.regresarAOrganigrama.bind(this);

    this.abrirEditarArea = this.abrirEditarArea.bind(this);
    this.guardarEdicionArea = this.guardarEdicionArea.bind(this);

    this.abrirEliminarArea = this.abrirEliminarArea.bind(this);
    this.eliminarArea = this.eliminarArea.bind(this);
  }

  setSearchQuery(value) {
    this.setState({ searchQuery: value });
  }

  getFilteredOrganigramas() {
    const { organigramas, searchQuery } = this.state;
    return organigramas.filter((o) =>
      o.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // ---------------- ACCIONES ----------------
  abrirCrear() {
    this.setState({ nuevoTitulo: "", isModalCrearOpen: true });
  }

  abrirVer(org) {
    this.setState({ selectedOrg: org, isModalVerOpen: true });
  }

  abrirAutorizar() {
    this.setState({ isModalAutorizarOpen: true });
  }

  abrirInsertarArea() {
    this.setState({
      nuevaArea: "",
      nuevoNivel: "",
      nuevaSuperior: "",
      isModalInsertarAreaOpen: true,
    });
  }

  // abrir modal de edición de área
  abrirEditarArea(area, index) {
    this.setState({
      areaEditando: { ...area, index },
      nuevaArea: area.area,
      nuevoNivel: area.nivel,
      nuevaSuperior: area.superior,
      isModalEditarAreaOpen: true,
    });
  }

  // guardar cambios de edición
  guardarEdicionArea() {
    const { areaEditando, gestionAreas, nuevaArea, nuevoNivel, nuevaSuperior } =
      this.state;

    if (!areaEditando) return;

    const nuevasAreas = [...gestionAreas];
    nuevasAreas[areaEditando.index] = {
      area: nuevaArea,
      nivel: nuevoNivel,
      superior: nuevaSuperior,
    };

    this.setState({
      gestionAreas: nuevasAreas,
      isModalEditarAreaOpen: false,
      areaEditando: null,
      nuevaArea: "",
      nuevoNivel: "",
      nuevaSuperior: "",
    });
  }

  abrirEliminarArea(area, index) {
    this.setState({
      areaAEliminar: { ...area, index },
      isModalEliminarAreaOpen: true,
    });
  }

   eliminarArea() {
    const { areaAEliminar, gestionAreas } = this.state;
    if (!areaAEliminar) return;

    const nuevasAreas = gestionAreas.filter(
      (_, index) => index !== areaAEliminar.index
    );

    this.setState({
      gestionAreas: nuevasAreas,
      isModalEliminarAreaOpen: false,
      areaAEliminar: null,
    });
  }

  regresarAOrganigrama() {
    this.setState({
      mostrarGestion: false,
      selectedOrg: null,
    });
  }

  crearOrganigrama() {
    const newOrg = {
      id: Date.now(),
      titulo: this.state.nuevoTitulo,
      fechaSolicitud: "Pendiente",
      fechaAutorizacion: "Pendiente",
    };

    this.setState((prev) => ({
      organigramas: [...prev.organigramas, newOrg],
      isModalCrearOpen: false,
    }));
  }

  autorizarOrganigrama() {
    this.setState({ isModalAutorizarOpen: false });
  }

  agregarArea() {
    const nueva = {
      area: this.state.nuevaArea,
      nivel: this.state.nuevoNivel,
      superior: this.state.nuevaSuperior,
    };

    this.setState((prev) => ({
      gestionAreas: [...prev.gestionAreas, nueva],
      isModalInsertarAreaOpen: false,
      nuevaArea: "",
      nuevoNivel: "",
      nuevaSuperior: "",
    }));
  }

  // ---------------- RENDER ROWS ----------------
  renderOrganigramaRow(org) {
    const autorizado =
      org.fechaAutorizacion && org.fechaAutorizacion !== "Pendiente";

    return (
      <tr key={org.id}>
        <td>{org.titulo}</td>
        <td>{org.fechaSolicitud}</td>
        <td>{org.fechaAutorizacion}</td>

        <td>
          <div className="actions-cell">
            {!autorizado && (
              <BotonReutilizable
                className="btn-action edit"
                onClick={() => {
                  this.setState({ selectedOrg: org, mostrarGestion: true });
                }}
              >
                Editar
              </BotonReutilizable>
            )}

            {autorizado && (
              <BotonReutilizable
                className="btn-action status-active"
                onClick={() => this.abrirVer(org)}
              >
                Ver
              </BotonReutilizable>
            )}
          </div>
        </td>
      </tr>
    );
  }

  // Tabla gestión áreas
  renderAreaRow(area, index) {
    return (
      <tr key={index}>
        <td>{area.area}</td>
        <td>{area.nivel}</td>
        <td>{area.superior}</td>
        <td>
          <BotonReutilizable
            className="btn-action edit"
            onClick={() => this.abrirEditarArea(area, index)}
          >
            Editar
          </BotonReutilizable>
          <BotonReutilizable
              className="btn-action delete"
              onClick={() => this.abrirEliminarArea(area, index)}
            >
              Eliminar
            </BotonReutilizable>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <main className="content-area">
        <section className="content-section">
          {/* ------------------ PANTALLA 1: ORGANIGRAMA ------------------ */}
          {!this.state.mostrarGestion && (
            <>
              <h2 className="card-title">Organigrama</h2>

              <div className="management-buttons-container">
                <BotonReutilizable onClick={() => this.abrirCrear()}>
                  Crear Organigrama
                </BotonReutilizable>
              </div>

              <Card>
                <TablaReutilizable
                  columns={[
                    "Título del Organigrama",
                    "Fecha de solicitud",
                    "Fecha de autorización",
                    "Acciones",
                  ]}
                  data={this.getFilteredOrganigramas()}
                  renderRow={(item) => this.renderOrganigramaRow(item)}
                />
              </Card>
            </>
          )}

          {/* ------------------ PANTALLA 2: GESTIÓN ORGANIZACIONAL ------------------ */}
          {this.state.mostrarGestion && (
            <>
              <h2 className="card-title">Gestión organizacional</h2>

              <div className="management-buttons-container">
                <BotonReutilizable
                  className="btn-secondary"
                  onClick={this.regresarAOrganigrama}
                >
                  Regresar
                </BotonReutilizable>

                <BotonReutilizable onClick={() => this.abrirInsertarArea()}>
                  Agregar áreas
                </BotonReutilizable>

                <BotonReutilizable
                  className="status-active"
                  onClick={() => this.abrirAutorizar()}
                >
                  Autorizar Organigrama
                </BotonReutilizable>
              </div>

              <Card>
                <TablaReutilizable
                  columns={["Área", "Nivel", "Área superior", "Acciones"]}
                  data={this.state.gestionAreas}
                  renderRow={(item, index) => this.renderAreaRow(item, index)}
                />
              </Card>
            </>
          )}
        </section>

        {/* ------------------ MODALES ------------------ */}

        {/* Modal crear nueva versión */}
        <ModalReutilizable
          title="Nueva versión de organigrama"
          isOpen={this.state.isModalCrearOpen}
          onClose={() => this.setState({ isModalCrearOpen: false })}
          onAccept={() => this.crearOrganigrama()}
          acceptButtonText="Crear"
        >
          <CampoFormulario
            label="Título del organigrama"
            value={this.state.nuevoTitulo}
            onChange={(e) => this.setState({ nuevoTitulo: e.target.value })}
            placeholder="Ej. Organigrama 2025–2028"
          />
        </ModalReutilizable>

        {/* Modal ver organigrama autorizado */}
        <ModalReutilizable
          title="Organigrama autorizado"
          isOpen={this.state.isModalVerOpen}
          onClose={() => this.setState({ isModalVerOpen: false })}
          onAccept={() => this.setState({ isModalVerOpen: false })}
          acceptButtonText="Cerrar"
          className="modal-organigrama"
        >
          <div className="organigrama-visual-container">
            <div className="organigrama-scroll-x">
              <ArbolOrganigrama areas={this.state.gestionAreas} />
            </div>
          </div>
        </ModalReutilizable>

        {/* Modal solicitar autorización */}
        <ModalReutilizable
          title="Autorizar organigrama"
          isOpen={this.state.isModalAutorizarOpen}
          onClose={() => this.setState({ isModalAutorizarOpen: false })}
          onAccept={() => this.autorizarOrganigrama()}
          acceptButtonText="Solicitar"
        >
          <p>¿Desea solicitar la autorización del organigrama actual?</p>
        </ModalReutilizable>

        {/* Modal agregar áreas */}
        <ModalReutilizable
          title="Agregar área"
          isOpen={this.state.isModalInsertarAreaOpen}
          onClose={() => this.setState({ isModalInsertarAreaOpen: false })}
          onAccept={() => this.agregarArea()}
          acceptButtonText="Agregar"
        >
          <CampoFormulario
            label="Nombre del área"
            value={this.state.nuevaArea}
            onChange={(e) => this.setState({ nuevaArea: e.target.value })}
            placeholder="Dirección de..."
          />

          <CampoFormulario
            label="Nivel"
            type="number"
            value={this.state.nuevoNivel}
            onChange={(e) => this.setState({ nuevoNivel: e.target.value })}
          />

          <CampoFormulario
            label="Selecciona el área superior"
            isSelect
            value={this.state.nuevaSuperior}
            onChange={(e) => this.setState({ nuevaSuperior: e.target.value })}
          >
            <option value="">-- Selecciona una opción --</option>
            {this.state.gestionAreas.map((a, i) => (
              <option key={i} value={a.area}>
                {a.area}
              </option>
            ))}
          </CampoFormulario>
        </ModalReutilizable>

        {/* Modal editar área */}
        <ModalReutilizable
          title="Editar área"
          isOpen={this.state.isModalEditarAreaOpen}
          onClose={() => this.setState({ isModalEditarAreaOpen: false })}
          onAccept={() => this.guardarEdicionArea()}
          acceptButtonText="Guardar cambios"
        >
          <CampoFormulario
            label="Nombre del área"
            value={this.state.nuevaArea}
            onChange={(e) => this.setState({ nuevaArea: e.target.value })}
            placeholder="Dirección de..."
          />

          <CampoFormulario
            label="Nivel"
            type="number"
            value={this.state.nuevoNivel}
            onChange={(e) => this.setState({ nuevoNivel: e.target.value })}
          />

          <CampoFormulario
            label="Área superior"
            isSelect
            value={this.state.nuevaSuperior}
            onChange={(e) => this.setState({ nuevaSuperior: e.target.value })}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="-">-</option>

            {this.state.gestionAreas.map((a, i) => (
              <option key={i} value={a.area}>
                {a.area}
              </option>
            ))}
          </CampoFormulario>
        </ModalReutilizable>

        <ModalReutilizable
          title="Eliminar área"
          isOpen={this.state.isModalEliminarAreaOpen}
          onClose={() =>
            this.setState({ isModalEliminarAreaOpen: false, areaAEliminar: null })
          }
          onAccept={() => this.eliminarArea()}
          acceptButtonText="Eliminar"
        >
          <p>
            ¿Estás seguro de que deseas eliminar el área{" "}{this.state.areaAEliminar?.area}?
          </p>
        </ModalReutilizable>
      </main>
    );
  }
}

export default Organigrama;
