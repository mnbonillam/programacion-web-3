const { performance } = require('perf_hooks');
const readline = require('readline');

const basic = require('./basic/basic');
const promise = require('./promise/promises');
const pool = require('./pool/pool');
const mysql = require('mysql2/promise');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function showTable(tabla) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'comida'
  });

  const [rows] = await connection.execute(`SELECT * FROM ${tabla}`);
  console.log(`\nContenido de la tabla ${tabla}:`);
  rows.forEach(row => {
    console.log(`ID: ${row.id} | Nombre: ${row.nombre} | Cantidad: ${row.cantidad} | Precio: ${row.precio}`);
  });
  await connection.end();
}

async function main() {
  console.log('Iniciando el proceso de actualización...');

  rl.question('¿Qué tabla quieres actualizar? (vegetales, frutas, carnes, lacteos, bebidas): ', async (tabla) => {
    rl.question('Ingresa el ID del registro a actualizar: ', async (id) => {
      rl.question('Nuevo nombre: ', async (nombre) => {
        rl.question('Nueva cantidad: ', async (cantidad) => {
          rl.question('Nuevo precio: ', async (precio) => {
        
            const startBasic = performance.now();
            basic.updateRecord(tabla, id, nombre, cantidad, precio);

            const startPromise = performance.now();
            promise.updateRecord(tabla, id, nombre, cantidad, precio);

            const startPool = performance.now();
            pool.updateRecord(tabla, id, nombre, cantidad, precio);

            setTimeout(() => {
              const endBasic = performance.now();
              const endPromise = performance.now();
              const endPool = performance.now();

              console.log(`Conexión básica: ${endBasic - startBasic} ms`);
              console.log(`Conexión con promesas: ${endPromise - startPromise} ms`);
              console.log(`Conexión con pool: ${endPool - startPool} ms`);

              showTable(tabla);

              rl.close();
            }, 2000);
          });
        });
      });
    });
  });
}

main();
