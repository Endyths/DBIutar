const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const rutaDestino = path.join(__dirname, '../img'); // Ruta absoluta a la carpeta
        console.log("Ruta de destino:", rutaDestino);
        cb(null, rutaDestino); // Guardar las fotos en utils/img
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para la foto
    },
});

// Configuración de multer
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true); // Aceptar solo imágenes
        } else {
            cb(new Error('Solo se permiten imágenes'), false); // Rechazar otros tipos de archivos
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});

module.exports = upload;