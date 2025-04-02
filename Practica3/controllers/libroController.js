const Libro = require('../models/libro');

exports.obtenerTodos = (req, res) => {
    Libro.obtenerTodos((err, resultados) => {
        if (err) throw err;
        res.render('index', { libros: resultados });
    });
};

exports.mostrarFormularioAgregar = (req, res) => {
    res.render('agregar');
};

exports.agregarLibro = (req, res) => {
    const nuevoLibro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        anio_publicacion: req.body.anio_publicacion
    };

    Libro.agregar(nuevoLibro, err => {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.mostrarFormularioEditar = (req, res) => {
    Libro.obtenerPorId(req.params.id, (err, resultados) => {
        if (err) throw err;
        res.render('editar', { libro: resultados[0] });
    });
};

exports.editarLibro = (req, res) => {
    const datosLibro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        anio_publicacion: req.body.anio_publicacion
    };

    Libro.actualizar(req.params.id, datosLibro, err => {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.eliminarLibro = (req, res) => {
    Libro.eliminar(req.params.id, err => {
        if (err) throw err;
        res.redirect('/');
    });
};
