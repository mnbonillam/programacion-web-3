const getConnection = require('./promises');
const { performance } = require('perf_hooks');

async function main() {
  const startConnection = performance.now();
  const connection = await getConnection();
  const endConnection = performance.now();
  console.log(`Conexión establecida en ${endConnection - startConnection} ms`);

  try {
    const canciones = [
      ['Please Please Please', 'Sabrina Carpenter'],
      ['Good Look Babe', 'Chappell Roan'],
      ['Supermercado', 'Mon Laferte']
    ];

    for (const [titulo, artista] of canciones) {
      const startInsert = performance.now();
      const [result] = await connection.execute(
        'INSERT INTO canciones (titulo, artista) VALUES (?, ?)',
        [titulo, artista]
      );
      const endInsert = performance.now();

      console.log(`Datos de canciones: [ { id: ${result.insertId}, titulo: '${titulo}', artista: '${artista}' } ]`);
      console.log(`ID del nuevo registro: ${result.insertId}`);
      console.log(`Inserción ejecutada en ${endInsert - startInsert} ms`);
    }

  } catch (error) {
    console.error('Error en la consulta:', error);
  } finally {
    await connection.end();
  }
}

main();
