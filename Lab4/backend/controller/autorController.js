import Autor from '../model/autor.js';

export const getAll = (req, res) => {
  Autor.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const getById = (req, res) => {
  Autor.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

export const create = (req, res) => {
  Autor.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Autor creado', id: result.insertId });
  });
};

export const update = (req, res) => {
  Autor.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Autor actualizado' });
  });
};

export const remove = (req, res) => { 
  Autor.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Autor eliminado' });
  });
};
