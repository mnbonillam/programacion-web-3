const pool = require('./pool');
const { performance } = require('perf_hooks');

async function main() {
  const startConnection = performance.now();
  const connection = await pool.getConnection();
  const endConnection = performance.now();
  console.log(`Conexión establecida en ${endConnection - startConnection} ms`);

  try {
    const startQuery = performance.now();
    const [rows] = await connection.query('SELECT * FROM canciones');
    const endQuery = performance.now();
    console.log(`Consulta ejecutada en ${endQuery - startQuery} ms`);
   
    console.log('Datos de canciones:', rows.map(row => ({
      id: row.id,
      titulo: row.titulo,
      artista: row.artista
    })));

    const canciones = [
      ['Please Please Please', 'Sabrina Carpenter'],
      ['Good Look Babe', 'Chappell Roan'],
      ['Supermercado', 'Mon Laferte']
    ];

    for (const [titulo, artista] of canciones) {
      const startInsert = performance.now();
      const [result] = await connection.query(
        'INSERT INTO canciones (titulo, artista) VALUES (?, ?)',
        [titulo, artista]
      );
      const endInsert = performance.now();
      console.log(`Inserción ejecutada en ${endInsert - startInsert} ms`);
      console.log(`ID del nuevo registro: ${result.insertId}`);
    }
    
  } catch (error) {
    console.error('Error en la consulta:', error);
  } finally {
    connection.release();
  }
}

main();
