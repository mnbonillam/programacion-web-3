import { Router } from 'express';
import db from '../config/db.js'; 
import { getAll, getById, create, update, remove } from '../controller/autorController.js';

const router = Router();

// Rutas para manejar los autores
router.get('/', getAll);  // Obtener todos los autores
router.get('/:id', getById);  // Obtener un autor por su ID
router.post('/', create);  // Crear un nuevo autor
router.put('/:id', update);  // Actualizar un autor por su ID
router.delete('/:id', remove);  // Eliminar un autor por su ID

// Ruta para obtener los libros de un autor específico
router.get('/:id_autor/libros', async (req, res) => {
  const { id_autor } = req.params;

  console.log(`Buscando libros para el autor con id: ${id_autor}`);  // Log para depuración

  try {
    // Usa promise() para que la consulta sea compatible con async/await
    const [libros] = await db.promise().query('SELECT * FROM libro WHERE id_autor = ?', [id_autor]);

    // Log para verificar los resultados de la consulta
    console.log('Libros encontrados:', libros);

    // Si no se encuentran libros, respondemos con un error 404
    if (libros.length === 0) {
      console.log(`No se encontraron libros para el autor con id: ${id_autor}`);
      return res.status(404).json({ message: 'No se encontraron libros para este autor' });
    }

    // Si encontramos libros, respondemos con los datos
    res.json(libros);
  } catch (err) {
    // En caso de error en la consulta, logueamos el error
    console.error('Error al obtener libros:', err.message);  // Asegúrate de ver el mensaje del error
    res.status(500).json({ error: 'Error al obtener los libros', details: err.message });
  }
});

export default router;
