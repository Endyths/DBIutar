const RegistroModel = require('../models/registroModel');

class RegistroController {
    constructor() {
        this.registroModel = new RegistroModel();
    }

    // Método para procesar el formulario
    procesarFormulario(req, res) {
        console.log("Archivo recibido:", req.file); // Depuración
        console.log("Datos del formulario:", req.body); // Depuración

        const datos = req.body;

        // Obtener la ruta de la foto subida
        const foto = req.file ? `/img/${req.file.filename}` : null;

        // Agregar la ruta de la foto a los datos
        datos.foto = foto;

        // Insertar el registro en la base de datos
        this.registroModel.insertarRegistro(datos, (err, lastID) => {
            if (err) {
                console.error("Error al guardar los datos:", err.message);
                return res.status(500).json({ success: false, message: 'Error al guardar los datos' });
            } else {
                console.log(`Datos guardados correctamente. ID del registro: ${lastID}`);
                res.json({ success: true, message: 'Datos enviados con éxito' });
            }
        });
    }
}

module.exports = RegistroController;