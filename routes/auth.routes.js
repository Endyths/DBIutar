const express = require('express');
const UserModel = require('../models/userModel');
const multer = require('multer'); // Para manejar la carga de archivos
const path = require('path');
const fs = require('fs');
const router = express.Router();
const authController= require('../controller/authController')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../utils/img')); // Guardar las fotos en utils/img
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para la foto
    },
});

const upload = multer({ storage });
// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para la vista "nav"
router.get('/nav', async (req, res) => {
    if (req.session.user) {
        try {
            // Obtener los registros de la base de datos
            const registros = await UserModel.getAllRegistros(); // Asegúrate de que este método exista en tu modelo
            res.render('nav', { user: req.session.user, registros }); // Pasa los registros a la vista
        } catch (error) {
            console.error('Error al obtener los registros:', error);
            res.status(500).send('Error al obtener los registros');
        }
    } else {
        res.redirect('/login');
    }
});
router.get('/registros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const registro = await UserModel.getRegistroCompletoPorId(id); // Usa tu modelo para obtener el registro

        if (!registro) {
            return res.status(404).json({ success: false, message: 'Registro no encontrado' });
        }

        res.json({ success: true, registro }); // Devuelve los detalles del registro
    } catch (error) {
        console.error('Error al obtener los detalles del registro:', error);
        res.status(500).json({ success: false, message: 'Error al obtener los detalles del registro' });
    }
});
// Ruta para editar un registro
router.put('/editar/:id', upload.single('foto'), async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre, apellido, cedula, direccion, telefono, correo, carrera,
            tipoAlergia, tipoSindrome, tipoFatiga, tipoDolores, contactoEmergencia, tipoSangre
        } = req.body;

        // Validación básica
        if (!nombre || !apellido || !cedula || !direccion || !telefono || !correo || !carrera || !contactoEmergencia || !tipoSangre) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }
        // Obtener el registro actual
        const registroActual = await UserModel.getRegistroPorId(id);

        // Manejo de la foto
        const foto = req.file ? `/img/${req.file.filename}` : registroActual.foto;
        if (req.file && registroActual.foto) {
            const rutaFotoAnterior = path.join(__dirname, '../utils/img', path.basename(registroActual.foto));
            if (fs.existsSync(rutaFotoAnterior)) {
                fs.unlinkSync(rutaFotoAnterior);
            }
        }

        // Actualizar el registro
        await UserModel.editarRegistro(id, {
            nombre, apellido, cedula, direccion, telefono, correo, carrera,
            tipoAlergia,  tipoSindrome,  tipoFatiga,
             tipoDolores, contactoEmergencia, tipoSangre, foto
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error al editar el registro:', error);
        res.status(500).json({ success: false, message: 'Error al editar el registro' });
    }
});
// Ruta para eliminar un registro
router.delete('/eliminar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener el registro actual para acceder a la foto asociada
        const registroActual = await UserModel.getRegistroPorId(id);

        // Si el registro tiene una foto, eliminarla de la carpeta
        if (registroActual.foto) {
            const rutaFoto = path.join(__dirname, '../utils/img', path.basename(registroActual.foto));
            if (fs.existsSync(rutaFoto)) {
                fs.unlinkSync(rutaFoto); // Eliminar la foto
            }
        }

        // Eliminar el registro de la base de datos
        await UserModel.eliminarRegistro(id);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar el registro' });
    }
});

module.exports = router;