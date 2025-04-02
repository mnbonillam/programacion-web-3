const db = require('../config/db');

class Libro {
    static obtenerTodos(callback) {
        db.query('SELECT * FROM libros', callback);
    }

    static agregar(nuevoLibro, callback) {
        db.query('INSERT INTO libros SET ?', nuevoLibro, callback);
    }

    static obtenerPorId(id, callback) {
        db.query('SELECT * FROM libros WHERE id = ?', [id], callback);
    }

    static actualizar(id, datosLibro, callback) {
        db.query('UPDATE libros SET ? WHERE id = ?', [datosLibro, id], callback);
    }

    static eliminar(id, callback) {
        db.query('DELETE FROM libros WHERE id = ?', [id], callback);
    }
}

module.exports = Libro;
