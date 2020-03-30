const express = require('express');
const router = express.Router();

const passport = require('passport');
//isLoggedIn= CUANDO ESTOY LOGUEADO
//isNotLoggedIn=cuando no estoy logueado
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//renderizar el formulario
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');

});

//recibir datos del formulario metodo de autenticacion
//router.post('/signup',(req, res) => {
  //  passport.authenticate('local.signup', {
    //    successRedirect: '/profile',
      //  failureRedirect: '/signup',
        //failureFlash: true
    //});

    //console.log(req.body);
    //res.send('Recibido');
    //res.render('')

//});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true

}))

//ruta de la vista del login
// SINGIN
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
  });

//ruta de la vista del login al enviar formulario
router.post('/signin', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true

    })(req, res, next);
});


//ruta de la vista del profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
    //res.send('TU PROFILE');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
  });

module.exports = router;