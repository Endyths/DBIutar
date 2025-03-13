const express = require('express');
const router = express.Router();
const RegistroController = require('../controller/registroController');
const registroController = new RegistroController();
const authRoutes = require('./auth.routes');
const upload = require('../utils/js/multerConfig');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', );
});
router.get("/login", function (req, res, next) {
  res.render('login', { error: null }); // Pasa error como null por defecto
});


router.post('/registro', upload.single('foto'), registroController.procesarFormulario.bind(registroController));
router.use('/auth', authRoutes);

module.exports = router;
