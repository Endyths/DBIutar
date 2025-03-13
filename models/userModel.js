const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/DBiutar.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Función para obtener el único usuario
class UserModel {
    static findUser (username, callback) {
        const sql = 'SELECT * FROM users WHERE username = ?'; // Asegúrate de que la tabla y columna existan
        db.get(sql, [username], (err, row) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }
    static getRegistroCompletoPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT id, cedula, nombre, apellido, direccion, telefono, correo, carrera, 
                       tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores, contactoEmergencia, tipoSangre, foto
                FROM registros
                WHERE id = ?
            `;
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    static getAllRegistros() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT id,nombre, apellido, cedula, carrera, telefono,tipoAlergia,  tipoSindrome, tipoFatiga, tipoDolores, contactoEmergencia, tipoSangre, foto FROM registros'; // Ajusta la consulta según tu tabla
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    static editarRegistro(id, datos) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE registros
                SET nombre = ?, apellido = ?, cedula = ?, direccion = ?, telefono = ?, correo = ?, carrera = ?,
                    tipoAlergia = ?, tipoSindrome = ?, tipoFatiga = ?,
                     tipoDolores = ?, contactoEmergencia = ?, tipoSangre = ?, foto = ?
                WHERE id = ?
            `;
            db.run(
                sql,
                [
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
                    id,
                ],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
    static getRegistroPorId(id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT nombre, apellido, cedula, direccion, telefono, correo, carrera,
                        tipoAlergia,  tipoSindrome, tipoFatiga,
                        tipoDolores, contactoEmergencia, tipoSangre, foto
                FROM registros
                WHERE id = ?
            `;
            db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Método para eliminar un registro
    static eliminarRegistro(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM registros WHERE id = ?';
            db.run(sql, [id], (err) => {
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