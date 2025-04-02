const mysql = require('mysql2/promise');
const { performance } = require('perf_hooks');

async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'comida'
  });
  return connection;
}

async function updateRecord(tabla, id, nombre, cantidad, precio) {
  const connection = await createConnection();
  const startQuery = performance.now();

  const campoCantidad = 'cantidad';

  try {
    const [result] = await connection.execute(
      `UPDATE ${tabla} SET nombre = ?, ${campoCantidad} = ?, precio = ? WHERE id = ?`,
      [nombre, cantidad, precio, id]
    );
    const endQuery = performance.now();

    console.log(`Conexión con promesas consulta ejecutada en ${endQuery - startQuery} ms`);

    if (result.affectedRows > 0) {
      console.log('Registro actualizado correctamente en promesas.');
    } else {
      console.log('No se encontró el registro en promesas.');
    }
  } catch (err) {
    console.error('Error al actualizar en promesas:', err);
  } finally {
    connection.end();
  }
}

module.exports = { updateRecord };
