const sqlite3 = require('sqlite3').verbose();

class RegistroModel {
    constructor() {
        this.db = new sqlite3.Database('./config/DBiutar.db', (err) => {
            if (err) {
                console.error("Error al conectar a la base de datos:", err.message); // Mensaje de error detallado
                throw err;
            }
            console.log("Conectado a la base de datos");
            });

            // Crear la tabla principal si no existe
            this.db.run(`
                CREATE TABLE IF NOT EXISTS registros (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    cedula TEXT,
                    nombre TEXT,
                    apellido TEXT,
                    direccion TEXT,
                    telefono TEXT,
                    correo TEXT,
                    carrera TEXT,
                    condicion_medica TEXT,
                    tipoAlergia TEXT,
                    tipoSindrome TEXT,
                    tipoFatiga TEXT,
                    tipoDolores TEXT,
                    contactoEmergencia TEXT,
                    tipoSangre TEXT,
                    foto TEXT  
                )
            `, (err) => {
                if (err) {
                    console.error("Error al crear la tabla 'registros':", err.message);
                } else {
                    console.log("Tabla 'registros' creada o ya existente");
                }
            });
        };
    

    // Método para insertar un registro
    insertarRegistro(datos, callback) {
        const sql = `
            INSERT INTO registros (
                cedula, nombre, apellido, direccion, telefono, correo, carrera,
                condicion_medica, tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores,
                contactoEmergencia, tipoSangre, foto  -- Nueva columna
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  -- Un parámetro adicional
        `;
        this.db.run(sql, [
            datos.cedula,
            datos.nombre,
            datos.apellido,
            datos.direccion,
            datos.telefono,
            datos.correo,
            datos.carrera,
            datos.condicion_medica,
            datos.tipoAlergia,
            datos.tipoSindrome,
            datos.tipoFatiga,
            datos.tipoDolores,
            datos.contactoEmergencia,
            datos.tipoSangre,
            datos.foto  // Nuevo parámetro
        ], function (err) {
            if (err) {
                console.error("Error al insertar el registro:", err.message);
                callback(err);
            } else {
                console.log("Registro insertado con ID:", this.lastID);
                callback(null, this.lastID);
            }
        });
    }
    cerrarConexion() {
      this.db.close((err) => {
          if (err) {
              console.error("Error al cerrar la conexión:", err.message);
          } else {
              console.log("Conexión a la base de datos cerrada");
          }
      });
    }
  }
   

module.exports= RegistroModel