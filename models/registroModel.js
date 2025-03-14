const { Client } = require('pg');
const client = require('../config/db'); // Importar la conexión configurada

class RegistroModel {
    constructor() {
        // Verificar si la tabla existe, y si no, crearla
        client.query(`
            CREATE TABLE IF NOT EXISTS registros (
                id SERIAL PRIMARY KEY,
                cedula TEXT,
                nombre TEXT,
                apellido TEXT,
                direccion TEXT,
                telefono TEXT,
                correo TEXT,
                carrera TEXT,
                tipoAlergia TEXT,
                tipoSindrome TEXT,
                tipoFatiga TEXT,
                tipoDolores TEXT,
                contactoEmergencia TEXT,
                tipoSangre TEXT,
                foto TEXT
            )
        `)
            .then(() => {
                console.log("Tabla 'registros' creada o ya existente");
            })
            .catch(err => {
                console.error("Error al crear la tabla 'registros':", err.message);
            });
    }

    // Método para insertar un registro
    insertarRegistro(datos, callback) {
        const sql = `
            INSERT INTO registros (
                cedula, nombre, apellido, direccion, telefono, correo, carrera, tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores,
                contactoEmergencia, tipoSangre, foto
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING id
        `;
        client.query(sql, [
            datos.cedula,
            datos.nombre,
            datos.apellido,
            datos.direccion,
            datos.telefono,
            datos.correo,
            datos.carrera,
            datos.tipoAlergia,
            datos.tipoSindrome,
            datos.tipoFatiga,
            datos.tipoDolores,
            datos.contactoEmergencia,
            datos.tipoSangre,
            datos.foto
        ], (err, result) => {
            if (err) {
                console.error("Error al insertar el registro:", err.message);
                callback(err);
            } else {
                console.log("Registro insertado con ID:", result.rows[0].id);
                callback(null, result.rows[0].id);
            }
        });
    }
}

module.exports = RegistroModel;