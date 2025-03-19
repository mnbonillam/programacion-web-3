const connection = require('./basic');
const { performance } = require('perf_hooks');

async function main() {
  const startConnection = performance.now();
  connection.connect((err) => {
    const endConnection = performance.now();
    if (err) throw err;
    console.log(`Conexión establecida en ${endConnection - startConnection} ms`);

    const startQuery = performance.now();
    connection.query('SELECT * FROM canciones', (err, results) => {
      const endQuery = performance.now();
      if (err) throw err;
      console.log(`Consulta ejecutada en ${endQuery - startQuery} ms`);
      console.log('Datos de canciones:', results);

      const startInsert = performance.now();
      const canciones = [
        ['Please Please Please', 'Sabrina Carpenter'],
        ['Good Look Babe', 'Chappell Roan'],
        ['Supermercado', 'Mon Laferte']
      ];
      
      canciones.forEach(([titulo, artista]) => {
        connection.query(
          'INSERT INTO canciones (titulo, artista) VALUES (?, ?)',
          [titulo, artista],
          (err, result) => {
            if (err) throw err;
            const endInsert = performance.now();
            console.log(`Datos de canciones: [ { id: ${result.insertId}, titulo: '${titulo}', artista: '${artista}' } ]`);
            console.log(`ID del nuevo registro: ${result.insertId}`);
          }
        );
      });
      
      
    });
  });
}

main();
