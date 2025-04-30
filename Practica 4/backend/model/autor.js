import db from '../config/db.js';

const Autor = {
  getAll: (callback) => {
    db.query('SELECT * FROM autor', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM autor WHERE id_autor = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO autor SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE autor SET ? WHERE id_autor = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM autor WHERE id_autor = ?', [id], callback);
  },
  
};


export default Autor;
