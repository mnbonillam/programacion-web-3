import React, { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import axios from 'axios';

function LibroList({ idAutor }) {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/autores/${idAutor}/libros`);
        setLibros(res.data);
        setError(null);  // Limpiar cualquier error previo
      } catch (err) {
        console.error('Error al cargar libros:', err);
        setError('Error al cargar los libros.');
      } finally {
        setLoading(false);
      }
    };

    if (idAutor) {
      setLoading(true);
      fetchLibros();
    }
  }, [idAutor]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>{error}</p>;
  if (libros.length === 0) return <p>No hay libros para este autor.</p>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Título</th>
          <th>Año de Publicación</th>
          <th>Género</th>
          <th>Resumen</th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro) => (
          <tr key={libro.id_libro}>
            <td>{libro.titulo}</td>
            <td>{libro.año_publicacion}</td>
            <td>{libro.genero}</td>
            <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{libro.resumen}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default LibroList;
