const { Client } = require('pg');
require('dotenv').config();

// Configurar el cliente de PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Necesario para conexiones seguras en Render
    },
});

// Conectar a la base de datos
client.connect()
    .then(() => {
        console.log('Conexión exitosa a PostgreSQL en Render!');
    })
    .catch(err => {
        console.error('Error al conectar a PostgreSQL:', err);
    });

module.exports = client;