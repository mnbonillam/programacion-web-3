const mysql = require('mysql2/promise');

async function createTables() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'comida'
  });

  const queries = [
    `CREATE TABLE IF NOT EXISTS vegetales (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      cantidad INT NOT NULL,
      precio DECIMAL(10,2) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS frutas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      cantidad INT NOT NULL,
      precio DECIMAL(10,2) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS carnes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) NOT NULL,
      tipo VARCHAR(100) NOT NULL,
      peso DECIMAL(5,2) NOT NULL,
      precio DECIMAL(10,2) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS lacteos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      cantidad INT NOT NULL,
      precio DECIMAL(10,2) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS bebidas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      volumen DECIMAL(5,2) NOT NULL,
      precio DECIMAL(10,2) NOT NULL
    )`
  ];

  for (const query of queries) {
    await connection.execute(query);
  }

  console.log('Tablas creadas correctamente.');
  await connection.end();
}

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

async function populateTables() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'comida'
  });

  const tables = {
    vegetales: [
      ['Lechuga', 10, 2.5],
      ['Tomate', 20, 3.0],
      ['Zanahoria', 15, 1.5],
      ['Pepino', 30, 1.0],
      ['Brócoli', 5, 4.0]
    ],
    frutas: [
      ['Manzana', 50, 2.0],
      ['Banana', 60, 1.2],
      ['Uva', 40, 3.5],
      ['Pera', 20, 2.5],
      ['Melón', 10, 5.0]
    ],
    carnes: [
      ['Pollo', 10, 7.5], 
      ['Res', 12, 9.0],
      ['Cerdo', 8, 8.5],
      ['Cordero', 4, 12.0],
      ['Pavo', 6, 11.5]
    ],
    lacteos: [
      ['Leche', 50, 1.0],
      ['Yogurt', 30, 2.0],
      ['Queso', 10, 4.0],
      ['Mantequilla', 5, 3.5],
      ['Crema', 15, 2.5]
    ],
    bebidas: [
      ['Coca-Cola', 50, 1.5], 
      ['Agua', 100, 0.5],
      ['Jugo de Naranja', 30, 2.0],
      ['Cerveza', 20, 3.5],
      ['Te', 40, 1.8]
    ]
  };

  for (const table in tables) {
    for (const row of tables[table]) {
      await connection.execute(
        `INSERT INTO ${table} (nombre, cantidad, precio) VALUES (?, ?, ?)`,
        row
      );
    }
    await showTable(table);
  }

  console.log('Datos insertados correctamente en todas las tablas.');
  await connection.end();
}

async function main() {
  await createTables(); 
  await populateTables(); 
}

main();
