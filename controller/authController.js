const UserModel = require('../models/userModel'); // Asegúrate de que este modelo esté configurado
const bcrypt = require('bcrypt');

class AuthController {
    // Método para iniciar sesión
    static login(req, res) {
        const { username, password } = req.body;

        UserModel.findUser(username, (err, user) => {
            if (err) {
                return res.status(500).send('Error en la base de datos');
            }

            if (!user) {
                return res.render('login', { error: 'Nombre de usuario incorrecto' });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.render('login', { error: 'Contraseña incorrecta' });
            }

            req.session.user = username; // Guardar el usuario en la sesión
            res.redirect('/auth/nav'); // Redirigir a la vista "nav"
        });
    }
    static async getRegistros(req, res) {
        try {
            const registros = await UserModel.getAllRegistros(); // Asegúrate de que este método exista en tu modelo
            res.render('nav', { user: req.session.user, registros });
        } catch (error) {
            res.status(500).send('Error al obtener los registros');
        }
    }
}

module.exports = AuthController;