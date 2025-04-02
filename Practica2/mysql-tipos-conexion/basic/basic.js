const mysql = require('mysql2');
const { performance } = require('perf_hooks');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'comida'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión básica establecida');
});

function updateRecord(tabla, id, nombre, cantidad, precio) {
  const startQuery = performance.now();

  const campoCantidad = 'cantidad';

  connection.query(
    `UPDATE ${tabla} SET nombre = ?, ${campoCantidad} = ?, precio = ? WHERE id = ?`,
    [nombre, cantidad, precio, id],
    (err, result) => {
      const endQuery = performance.now();
      if (err) throw err;

      console.log(`Conexión básica consulta ejecutada en ${endQuery - startQuery} ms`);

      if (result.affectedRows > 0) {
        console.log('Registro actualizado correctamente en básica.');
      } else {
        console.log('No se encontró el registro en básica.');
      }
    }
  );
}

module.exports = { updateRecord };
