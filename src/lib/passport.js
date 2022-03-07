const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//llamar al modulo de bd
const pool = require('../database');
const helpers = require('../lib/helpers');

//crear login
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(password, user.password)
      if (validPassword) {
        done(null, user, req.flash('success_msg', 'Bienvenido ' + user.username));
      } else {
        done(null, false, req.flash('message', 'Password Incorrecto'));
      }
    } else {
      return done(null, false, req.flash('message', 'El nombre de usuario no existe.'));
    }
  }));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async(req, username, password, done) =>{
//mostrar los datos por consola
    //console.log(req.body);
    //guardar los datos del formulario
    const {fullname} = req.body;
    const newUser ={
        username,
        password,
        fullname

    };
    //cifrar el password
    newUser.password = await helpers.encryptPassword(password);
    //INSERTO EN la BD
    const result = await pool.query('INSERT INTO usuarios SET ?',[newUser]);
    newUser.id = result.insertId;
    //muestro por consola el registro afectado en la BD
    //console.log(result);

    //retorno el done para que continue el proceso
    return done(null, newUser);

}));

//serializar la sesion del usuario
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//deserializar la sesion del usuario
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, rows[0]);
});

