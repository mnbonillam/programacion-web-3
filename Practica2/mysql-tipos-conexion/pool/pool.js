const mysql = require('mysql2/promise');

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'musica',
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0 
});

module.exports = pool;
