const { Client } = require('pg');
const client = require('../config/db'); // Importar la conexión configurada

class UserModel {
    static findUser(username, callback) {
        const sql = 'SELECT * FROM users WHERE username = $1';
        client.query(sql, [username], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.rows[0]);
            }
        });
    }

    static getRegistroCompletoPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT id, cedula, nombre, apellido, direccion, telefono, correo, carrera, 
                       tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores, contactoEmergencia, tipoSangre, foto
                FROM registros
                WHERE id = $1
            `;
            client.query(sql, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    }

    static getAllRegistros() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id, nombre, apellido, cedula, carrera, telefono, tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores, contactoEmergencia, tipoSangre, foto FROM registros';
            client.query(sql, [], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    }

    static editarRegistro(id, datos) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE registros
                SET nombre = $1, apellido = $2, cedula = $3, direccion = $4, telefono = $5, correo = $6, carrera = $7,
                    tipoAlergia = $8, tipoSindrome = $9, tipoFatiga = $10, tipoDolores = $11, contactoEmergencia = $12, tipoSangre = $13, foto = $14
                WHERE id = $15
            `;
            client.query(sql, [
                datos.nombre,
                datos.apellido,
                datos.cedula,
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
                datos.foto,
                id
            ], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static getRegistroPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT nombre, apellido, cedula, direccion, telefono, correo, carrera,
                       tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores, contactoEmergencia, tipoSangre, foto
                FROM registros
                WHERE id = $1
            `;
            client.query(sql, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    }

    static eliminarRegistro(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM registros WHERE id = $1';
            client.query(sql, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = UserModel;