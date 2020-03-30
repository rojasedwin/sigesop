const express = require('express');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');


//INICIALIZACION
const app = express();
require('./lib/passport');

//SETTINGS
//PUERTO
app.set('port', process.env.PORT || 4000);
//CONFIGURO EL HANDLEBARS
//rutas de las views
app.set('views', path.join(__dirname,'views'));
//motor d eplantillas handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
//utilizar el motor
app.set('view engine', '.hbs');


//MIDDLEWARES
app.use(session({
    secret: 'sigesopsession',
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(database)
}));

//mensajes flash
app.use(flash());
app.use(morgan('dev'));
//aceptar datos desde los formularios
app.use(express.urlencoded({extended: false}));
//enviar y recibir json
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//VARIABLES GLOBAL
app.use((req, res, next) => {
    //mensajes al usuario
    app.locals.success = req.flash('success');
    res.locals.success_msg=req.flash('success_msg');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//RUTAS = Urls
app.use(require('./routes'));
app.use(require('./routes/authentication'));
//prefijo
app.use('/links', require('./routes/links'));

//PUBLIC
//carpetas publicas
app.use(express.static(path.join(__dirname, 'public')));

//INICIALIZANDO EL SERVIDOR
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});