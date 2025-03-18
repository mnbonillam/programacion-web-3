const mysql = require('mysql2/promise');
//PROMESAS
async function main() {
  console.time('Conexión con Promesas');  

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mypassword',
      database: 'testdb'
    });

    console.log('Connected to MySQL Database!');  

    const [rows, fields] = await connection.execute('SELECT * FROM users');
    console.log('Query Result:', rows);

    console.timeEnd('Conexión con Promesas');  

    await connection.end();
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
