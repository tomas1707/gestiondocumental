import React, { Component } from "react";
import ReticulaPdf from "../assets/Reticula.pdf"; // <- tu archivo simulador

class VisorDocumento extends Component {
  render() {
    const { documentTitle } = this.props;
    const url = ReticulaPdf;

    return (
      <div className="visor-documento-container">
        {documentTitle && (
          <h3 className="visor-documento-titulo">{documentTitle}</h3>
        )}

        <div className="visor-documento-embed">
          <object data={url} type="application/pdf" width="100%" height="500px">
            <p>
              No se pudo mostrar el PDF.{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                Abrir en otra pestaña
              </a>
            </p>
          </object>
        </div>
      </div>
    );
  }
}

export default VisorDocumento;
