const mysql = require('mysql2/promise');

async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'musica'
  });
}

module.exports = getConnection;
