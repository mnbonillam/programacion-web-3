const mysql = require('mysql2');
//POOLING 
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.time('Conexión Pooling');  

pool.query('SELECT * FROM users', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
  console.timeEnd('Conexión Pooling');  
});
