const mysql = require('mysql2');
//BASICA
console.time('Conexión Básica');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword',
  database: 'testdb'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');

  connection.query('SELECT * FROM users', (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    console.timeEnd('Conexión Básica');  
  });

  connection.end();
});
