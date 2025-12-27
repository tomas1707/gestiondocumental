import React, { useState, useMemo } from "react";
import "../styles/Dispersion.css";
import TablaReutilizable from "../components/TablaReutilizable";
import BotonReutilizable from "../components/BotonReutilizable";
import FiltroBusqueda from "../components/FiltroBusqueda";
import EtiquetaEstado from "../components/EtiquetaEstado";
import Card from "../components/Card";
import VisorDocumento from "../components/VisorDocumento";
import GrupoEntrada from "../components/GrupoEntrada";
import CheckboxArea from "../components/CheckboxArea";
import DropdownReutilizable from "../components/DropdownReutilizable";

// --- Datos Simulados ---
const initialData = [
  { id: 1, asunto: "Solicitud para iniciar obras en la vía pública.", numOficio: "Oficio No. 001/2025/DG", tipo: "Notificación de trabajos.pdf", fRecepcion: "20-09-2025", fAsignacion: "20-09-2025", fRespuesta: "21-09-2025", estatus: "Turnado", detalle: "Notificación de Trabajos sobre el Derecho de Vía" },
  { id: 3, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "Respondido", detalle: "Permiso para evento deportivo en plaza central" },
  { id: 4, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "Vencido", detalle: "Permiso para evento deportivo en plaza central" },
  { id: 5, asunto: "Permiso para evento deportivo en plaza central.", numOficio: "Oficio No. 002/2025/SG", tipo: "Solicitud de uso de espacio público.pdf", fRecepcion: "22-09-2025", fAsignacion: "22-09-2025", fRespuesta: "25-09-2025", estatus: "En proceso", detalle: "Permiso para evento deportivo en plaza central" },
];

const initialRespuestas = [
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
  { documento: "Informe Técnico.pdf", respuesta: "Recibí respuesta", fechaEntrega: "29-09-2025" },
];

const estatusOptions = [
  { label: "Mostrar Todos", status: "all" },
  { label: "Turnado", status: "Turnado" },
  { label: "En proceso", status: "En proceso" },
  { label: "Respondido", status: "Respondido" },
  { label: "Vencido", status: "Vencido" },
];

const areas = ["Presidencia", "Secretaría Técnica", "Jurídico", "Ley de Archivo"];

const Dispersion = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formState, setFormState] = useState({
    asunto: "",
    fechalimite: "",
    areasDestino: [],
  });

  // --- Filtrado de datos ---
  const filteredData = useMemo(() => {
    return data.filter((doc) => {
      const matchesSearch =
        doc.asunto.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.numOficio && doc.numOficio.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === "all" || doc.estatus === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [data, searchQuery, activeFilter]);

  // --- Handlers ---
  const handleRowClick = (doc) => {
    setSelectedDocument(doc);
    setFormState({
      asunto: doc.detalle,
      fechalimite: "",
      areasDestino: [],
    });
  };

  const handleAreaChange = (area) => {
    setFormState((prev) => {
      const newAreas = prev.areasDestino.includes(area)
        ? prev.areasDestino.filter((a) => a !== area)
        : [...prev.areasDestino, area];
      return { ...prev, areasDestino: newAreas };
    });
  };

  const renderDocumentoRow = (doc) => (
    <tr
      key={doc.id}
      onClick={() => handleRowClick(doc)}
      className={selectedDocument && selectedDocument.id === doc.id ? "selected-row" : ""}
    >
      <td>
        <div className="asunto-container">
          <div className="asunto-text">{doc.asunto}</div>
          {doc.numOficio && <div className="num-oficio-text">{doc.numOficio}</div>}
        </div>
      </td>
      <td>{doc.tipo}</td>
      <td>{doc.fRecepcion}</td>
      <td>{doc.fAsignacion}</td>
      <td>{doc.fRespuesta}</td>
      <td><EtiquetaEstado estatus={doc.estatus} /></td>
    </tr>
  );

  const renderRespuestaRow = (resp) => (
    <tr key={resp.documento}>
      <td>{resp.documento}</td>
      <td>{resp.respuesta}</td>
      <td>{resp.fechaEntrega}</td>
    </tr>
  );

  return (
    <main className="content-area">
      <div className="main-layout">
        <Card title="Correspondencia" className="table-component">
          <div className="toolbar-container">
            <FiltroBusqueda
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por Asunto o No. Oficio..."
            />
            <DropdownReutilizable
              options={estatusOptions}
              value={activeFilter}
              onChange={(value) => setActiveFilter(value)}
            />
          </div>

          <div className="tabla-wrapper">
            <TablaReutilizable
              columns={["Asunto/Num. Oficio", "Tipo de Documento", "Fecha Recepción", "Fecha Asignada", "Fecha Respuesta", "Estatus"]}
              data={filteredData}
              renderRow={renderDocumentoRow}
              className="tabla-principal"
            />
          </div>

          <hr className="divider" />
          <h2 className="card-title">Respuestas y Entregas</h2>

          <div className="button-group-top">
            <BotonReutilizable className="btn-accion">Recibí Respuesta</BotonReutilizable>
            <BotonReutilizable className="btn-accion">Entregué Respuesta</BotonReutilizable>
          </div>

          <div className="tabla-wrapper">
            <TablaReutilizable
              columns={["Documentos", "Respuesta Recibida", "Fecha de Entrega"]}
              data={initialRespuestas}
              renderRow={renderRespuestaRow}
              className="tabla-respuestas"
            />
          </div>
        </Card>

        <Card className="form-component">
          <h2>{selectedDocument ? selectedDocument.detalle : "Seleccione un documento para dispersar"}</h2>

          <VisorDocumento
            documentUrl={selectedDocument ? `/docs/${selectedDocument.tipo}` : null}
            documentTitle={selectedDocument ? selectedDocument.detalle : null}
          />

          <GrupoEntrada label="Asunto:" id="asunto">
            <textarea
              id="asunto"
              rows="2"
              placeholder="Escribe el asunto..."
              value={formState.asunto}
              onChange={(e) => setFormState({ ...formState, asunto: e.target.value })}
            />
          </GrupoEntrada>

          <GrupoEntrada label="Fecha límite" id="fechalimite">
            <input
              type="text"
              id="fechalimite"
              placeholder="Fecha límite"
              value={formState.fechalimite}
              onChange={(e) => setFormState({ ...formState, fechalimite: e.target.value })}
            />
          </GrupoEntrada>

          <div className="form-group">
            <label>Área de Destino</label>
            <div id="area-checkboxes" className="checkbox-group">
              {areas.map((area) => (
                <CheckboxArea
                  key={area}
                  areaName={area}
                  isChecked={formState.areasDestino.includes(area)}
                  onChange={() => handleAreaChange(area)}
                />
              ))}
            </div>
          </div>

          <BotonReutilizable
            className="btn-confirmar"
            onClick={() => console.log("Confirmar Dispersión", formState)}
          >
            Confirmar Dispersión
          </BotonReutilizable>
        </Card>
      </div>
    </main>
  );
};

export default Dispersion;
