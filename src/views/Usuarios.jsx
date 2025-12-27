import React, { useState } from 'react';
import '../styles/Usuarios.css'
import BotonReutilizable from '../components/BotonReutilizable';
import FiltroBusqueda from '../components/FiltroBusqueda';
import TablaReutilizable from '../components/TablaReutilizable';
import ModalReutilizable from '../components/ModalReutilizable';
import FormularioUsuario from '../components/FormularioUsuario';
import FormularioPrivilegios from '../components/FormularioPrivilegios';
import EtiquetaEstado from '../components/EtiquetaEstado';
import BotonDesplegable from '../components/BotonDesplegable';

// Datos de ejemplo
const initialUsers = [
  { id: 1, nombre: 'Jacob Pérez', numTrabajador: '012', correo: 'jacob@ejemplo.com', usuario: 'Jacob', adscripcion: 'Ley Archivo', estatus: 'Activo' },
  { id: 2, nombre: 'Melissa López', numTrabajador: '003', correo: 'melissa@ejemplo.com', usuario: 'Melissa', adscripcion: 'Oficialía de Partes', estatus: 'Inactivo' },
  { id: 3, nombre: 'John Carreon', numTrabajador: '010', correo: 'john@ejemplo.com', usuario: 'John', adscripcion: 'Turismo y Cultura', estatus: 'Activo' },
  { id: 4, nombre: 'Sofía Martínez', numTrabajador: '125', correo: 'smartinez@ejemplo.com', usuario: 'SMartinez', adscripcion: 'Presidencia municipal', estatus: 'Activo' },
  { id: 5, nombre: 'Carlos Ruiz', numTrabajador: '045', correo: 'cruiz@ejemplo.com', usuario: 'CRuiz', adscripcion: 'Contraloria', estatus: 'Inactivo' },
  { id: 6, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },
  { id: 7, nombre: 'Ana García', numTrabajador: '078', correo: 'agarcia@ejemplo.com', usuario: 'AGarcia', adscripcion: 'Ley Archivo', estatus: 'Activo' },

];

const Usuarios = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalPrivilegesOpen, setIsModalPrivilegesOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [privilegeData, setPrivilegeData] = useState({});

  const columns = ['Nombre', 'Num. Trabajador', 'Correo Electrónico', 'Usuario', 'Adscripción', 'Estatus', 'Acciones'];

  // Filtro
  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setCurrentUser({ adscripcion: 'Ninguno' });
    setIsModalAddOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsModalEditOpen(true);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePrivilegeInputChange = (e) => {
    const { name, value } = e.target;
    setPrivilegeData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const newUser = { ...currentUser, id: Date.now(), estatus: 'Activo' };
    setUsers([...users, newUser]);
    setIsModalAddOpen(false);
  };

  const handleEditUser = () => {
    setUsers(users.map(u => (u.id === currentUser.id ? currentUser : u)));
    setIsModalEditOpen(false);
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(u => (u.id === userId ? { ...u, estatus: newStatus } : u)));
  };

  const handleApplyPrivilege = () => {
    console.log("Privilegio aplicado:", privilegeData.privilegio);
    setIsModalPrivilegesOpen(false);
  };

  // Opciones de estado
  const getStatusOptions = (userId) => [
  {
    label: "Activo",
    statusClass: "status-active",
    onClick: () => handleStatusChange(userId, "Activo"),
  },
  {
    label: "Inactivo",
    statusClass: "status-inactive",
    onClick: () => handleStatusChange(userId, "Inactivo"),
  },
];

  // -------------------------------------------------------------------
  // ✅ Compatible con el nuevo formato de TablaReutilizable
  // -------------------------------------------------------------------
  const tableData = filteredUsers.map(user => ({
    _id: user.id,
    Nombre: { main: user.nombre },
    'Num. Trabajador': { main: user.numTrabajador },
    'Correo Electrónico': { main: user.correo },
    Usuario: { main: user.usuario },
    Adscripción: { main: user.adscripcion },
    Estatus: { main: <EtiquetaEstado estatus={user.estatus} /> },
    Acciones: {
      main: (
        <div className="actions-cell">
          <BotonReutilizable
            className="btn-action edit"
            title="Editar Usuario"
            onClick={() => openEditModal(user)}
          >
            Editar
          </BotonReutilizable>

          <BotonDesplegable title="Estado" options={getStatusOptions(user.id)} />
        </div>
      )
    }
  }));
const [selectedUserId, setSelectedUserId] = useState(null);
  return (
    <div className="main-content-wrapper">
      <main className="content-area">
        <section className="content-section">
          <div className="table-container">
            <h2 className="card-title">Gestión de Usuarios</h2>

            <div className="management-buttons-container">
              <BotonReutilizable onClick={openAddModal}>
                Agregar Usuario
              </BotonReutilizable>

              <BotonReutilizable
  onClick={() => {
    if (!selectedUserId) {
      alert("Seleccione un usuario antes de otorgar privilegios.");
      return;
    }
    setIsModalPrivilegesOpen(true);
  }}
  className="btn-privileges-override"
>
  Otorgar Privilegios
</BotonReutilizable>
            </div>

            <div className="search-filter-container">
              <FiltroBusqueda
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar usuario por nombre..."
              />
            </div>

            {/* TABLA REUTILIZABLE */}
            <TablaReutilizable
  columns={columns}
  data={tableData}
  renderRow={(row, index) => {
    const isSelected = row._id === selectedUserId;

    return (
      <tr
        key={index}
        className={isSelected ? "selected-row" : ""}
        onClick={() => setSelectedUserId(row._id)}
        style={{ cursor: "pointer" }}
      >
        {columns.map((col, colIndex) => (
          <td key={colIndex}>
            {row[col]?.main || ""}
          </td>
        ))}
      </tr>
    );
  }}
/>
          </div>
        </section>
      </main>

      {/* MODALES */}
      <ModalReutilizable
        id="modalInsertarUsuario"
        title="Agregar Usuario"
        isOpen={isModalAddOpen}
        onClose={() => setIsModalAddOpen(false)}
        onAccept={handleAddUser}
      >
        <FormularioUsuario
          userData={currentUser}
          onInputChange={handleUserInputChange}
        />
      </ModalReutilizable>

      <ModalReutilizable
        id="modalEditarUsuario"
        title="Editar Usuario"
        isOpen={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onAccept={handleEditUser}
        acceptButtonText="Guardar"
      >
        <FormularioUsuario
          userData={currentUser}
          onInputChange={handleUserInputChange}
          isEdit={true}
        />
      </ModalReutilizable>

      <ModalReutilizable
        id="modalOtorgarPrivilegios"
        title="Otorgar Privilegios"
        isOpen={isModalPrivilegesOpen}
        onClose={() => setIsModalPrivilegesOpen(false)}
        onAccept={handleApplyPrivilege}
        acceptButtonText="Aplicar"
      >
        <FormularioPrivilegios
          privilegioData={privilegeData}
          onInputChange={handlePrivilegeInputChange}
        />
      </ModalReutilizable>
    </div>
  );
};

export default Usuarios;
