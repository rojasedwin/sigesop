const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
var session = require('express-session')
const MySQLStore = require('express-mysql-session')

const flash = require('connect-flash')
const toastr = require('express-toastr')

const app = express()

//PUERTO
app.set('port', process.env.PORT || 7000);

//seteamos el motor de plantillas
app.set('view engine', 'ejs')

app.use(expressLayouts)

//seteamos la carpeta public para archivos estáticos
app.use(express.static('public'))

//para procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//para poder trabajar con las cookies
app.use(cookieParser())




app.use(flash());

app.use(toastr());
//app.use(router.routes)

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'nikhilsingh',
    resave: false,
    saveUninitialized: false,
   
  }));
/*app.listen(7000, ()=>{
    console.log('SERVER UP runnung in http://localhost:7000')
})*/

/*app.use(session({
    secret: 'siacoisession',
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(database)
}));*/


//llamar al router
app.use('/', require('./routes/router'))
const router = require('./routes/router')


//INICIALIZANDO EL SERVIDOR
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});