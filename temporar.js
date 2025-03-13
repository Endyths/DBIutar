const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('config/DBiutar.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});
db.run(`DROP TABLE registros ;
);`, (err) => {
    if (err) {
        console.error('Error al crear la tabla de usuarios:', err.message);
    } else {
        console.log('Tabla de usuarios creada o ya existe.');
    }
});

// Datos del usuario
const username = 'Iutar--Cagua2040@'; // Cambia esto al nombre de usuario deseado
const password = 'Sedecagua2025'; // Cambia esto a la contraseña deseada

// Hashear la contraseña y guardar el usuario en la base de datos
