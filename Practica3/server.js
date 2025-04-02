const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const librosRoutes = require('./routes/libros');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

app.use('/', librosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
