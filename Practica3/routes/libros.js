
const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.obtenerTodos);
router.get('/agregar', libroController.mostrarFormularioAgregar);
router.post('/agregar', libroController.agregarLibro);
router.get('/editar/:id', libroController.mostrarFormularioEditar);
router.post('/editar/:id', libroController.editarLibro);
router.get('/eliminar/:id', libroController.eliminarLibro);

module.exports = router;
