const mysql = require('mysql2');
const { performance } = require('perf_hooks');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'comida'
});

async function updateRecord(tabla, id, nombre, cantidad, precio) {
  const connection = await pool.promise().getConnection();
  const startQuery = performance.now();

  const campoCantidad = 'cantidad';

  try {
    const [result] = await connection.execute(
      `UPDATE ${tabla} SET nombre = ?, ${campoCantidad} = ?, precio = ? WHERE id = ?`,
      [nombre, cantidad, precio, id]
    );
    const endQuery = performance.now();

    console.log(`Conexión con pool consulta ejecutada en ${endQuery - startQuery} ms`);

    if (result.affectedRows > 0) {
      console.log('Registro actualizado correctamente en pool.');
    } else {
      console.log('No se encontró el registro en pool.');
    }
  } catch (err) {
    console.error('Error al actualizar en pool:', err);
  } finally {
    connection.release();
  }
}

module.exports = { updateRecord };
