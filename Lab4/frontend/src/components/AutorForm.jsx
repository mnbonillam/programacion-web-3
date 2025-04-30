import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function AutorForm({ autorEditado, onSuccess }) {
  const [form, setForm] = useState({
    nombre: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    biografia: ''
  });

  useEffect(() => {
    if (autorEditado) {
      setForm(autorEditado);
    }
  }, [autorEditado]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id_autor) {
      await axios.put(`http://localhost:3001/api/autores/${form.id_autor}`, form);
    } else {
      await axios.post('http://localhost:3001/api/autores', form);
    }
    setForm({ nombre: '', nacionalidad: '', fecha_nacimiento: '', biografia: '' });
    onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre del autor"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nacionalidad</Form.Label>
        <Form.Control
          name="nacionalidad"
          value={form.nacionalidad}
          onChange={handleChange}
          placeholder="Ej: Argentina"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="fecha_nacimiento"
          value={form.fecha_nacimiento}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Biografía</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="biografia"
          value={form.biografia}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Guardar
      </Button>
    </Form>
    
  );
  
}

export default AutorForm;
