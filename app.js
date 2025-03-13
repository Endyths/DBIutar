
var createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv= require('dotenv/config')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const session = require('express-session');



const app = express();
const PORT= process.env.PORT || 2524;
app.use(session({
  secret: process.env.SESSION, // Cambia esto por una clave secreta más segura
  resave: false,
  saveUninitialized: true
}));
// view engine setup
app.use(express.static ('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'utils/img')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRoutes);






app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});
