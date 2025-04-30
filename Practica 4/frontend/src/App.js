import React, { useState } from 'react';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container } from 'react-bootstrap';
import LibroList from './components/LibroList';


function App() {
  const [autorEditado, setAutorEditado] = useState(null);
  const [reload, setReload] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [autorLibrosId, setAutorLibrosId] = useState(null);
  const [mostrarLibros, setMostrarLibros] = useState(false);


  const refresh = () => {
    setReload(!reload);
    setAutorEditado(null);
    setMostrarFormulario(false);
  };

  const handleAgregarClick = () => {
    setAutorEditado(null);
    setMostrarFormulario(true);
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold"> Gestión de Autores</h1>
        <Button variant="success" size="lg" onClick={handleAgregarClick}>
          Agregar Autor
        </Button>
      </div>

      <AutorList
  key={reload}
  onEdit={(autor) => {
    setAutorEditado(autor);
    setMostrarFormulario(true);
  }}
  onVerLibros={(id_autor) => {
    setAutorLibrosId(id_autor);
    setMostrarLibros(true);
  }}
/>


      <Modal show={mostrarFormulario} onHide={() => setMostrarFormulario(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {autorEditado ? ' Editar Autor' : ' Nuevo Autor'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AutorForm autorEditado={autorEditado} onSuccess={refresh} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarFormulario(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={mostrarLibros} onHide={() => setMostrarLibros(false)} centered size="lg">
  <Modal.Header closeButton>
    <Modal.Title>📖 Libros del Autor</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <LibroList idAutor={autorLibrosId} />
  </Modal.Body>
</Modal>

    </Container>
  );
}

export default App;
