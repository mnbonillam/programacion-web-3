const mysql = require('mysql');
const { performance } = require('perf_hooks');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'comida'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión establecida correctamente.');
  updateRecord();
});

function updateRecord() {
  rl.question('¿En qué tabla quieres actualizar un registro? (vegetales, frutas, carnes, lacteos, bebidas): ', (tabla) => {
    rl.question('Ingresa el ID del registro a actualizar: ', (id) => {
      rl.question('Nuevo nombre: ', (nombre) => {
        rl.question('Nueva cantidad ', (cantidad) => {
          rl.question('Nuevo precio: ', (precio) => {
            const startQuery = performance.now();
            
            let campoCantidad = 'cantidad';
            if (tabla === 'carnes') campoCantidad = 'peso';
            if (tabla === 'bebidas') campoCantidad = 'volumen';

            connection.query(
              `UPDATE ${tabla} SET nombre = ?, ${campoCantidad} = ?, precio = ? WHERE id = ?`,
              [nombre, cantidad, precio, id],
              (err, result) => {
                const endQuery = performance.now();
                if (err) throw err;

                console.log(`Consulta ejecutada en ${endQuery - startQuery} ms`);

                if (result.affectedRows > 0) {
                  console.log('Registro actualizado correctamente.');
                } else {
                  console.log('No se encontró el registro.');
                }
                rl.close();
                connection.end();
              }
            );
          });
        });
      });
    });
  });
}
