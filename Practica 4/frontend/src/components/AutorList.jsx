import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function AutorList({ onEdit, onVerLibros }) {
  const [autores, setAutores] = useState([]);

  const fetchAutores = async () => {
    const res = await axios.get('http://localhost:3001/api/autores');
    setAutores(res.data);
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/autores/${id}`);
    fetchAutores();
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-3">Lista de Autores</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nacionalidad</th>
            <th>Fecha de Nacimiento</th>
            <th>Biografía</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => (
            <tr key={autor.id_autor}>
              <td>{autor.id_autor}</td>
              <td>{autor.nombre}</td>
              <td>{autor.nacionalidad || '—'}</td>
              <td>{autor.fecha_nacimiento || '—'}</td>
              <td style={{ maxWidth: '300px' }}>{autor.biografia || '—'}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(autor)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(autor.id_autor)}
                >
                  Eliminar
                </Button>
                <Button
  variant="info"
  size="sm"
  onClick={() => onVerLibros(autor.id_autor, autor)}
>
  Ver libros
</Button>


              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AutorList;
