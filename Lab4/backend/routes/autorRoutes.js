import { Router } from 'express';
import db from '../config/db.js'; 
import { getAll, getById, create, update, remove } from '../controller/autorController.js';

const router = Router();

router.get('/', getAll);  
router.get('/:id', getById);  
router.post('/', create);  
router.put('/:id', update);  
router.delete('/:id', remove);  

router.get('/:id_autor/libros', async (req, res) => {
  const { id_autor } = req.params;

  console.log(`Buscando libros para el autor con id: ${id_autor}`);  

  try {
    
    const [libros] = await db.promise().query('SELECT * FROM libro WHERE id_autor = ?', [id_autor]);

    console.log('Libros encontrados:', libros);

    if (libros.length === 0) {
      console.log(`No se encontraron libros para el autor con id: ${id_autor}`);
      return res.status(404).json({ message: 'No se encontraron libros para este autor' });
    }

    res.json(libros);
  } catch (err) {
   
    console.error('Error al obtener libros:', err.message); 
    res.status(500).json({ error: 'Error al obtener los libros', details: err.message });
  }
});

export default router;
