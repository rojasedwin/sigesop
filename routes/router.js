const express = require('express')

const router = express.Router()

const authController = require('../controllers/authController')
const {vistaPrincipal, vistaUsuarios} = require('../controllers/PageControllers')

//router para las vistas
/*router.get('/',vistaPrincipal, authController.isAuthenticated, (req, res)=>{    
    res.render('layout', {user:req.user})
})*/

router.get('/', (req, res)=>{
   
    res.render('index', {layout: false});
})
router.get('/home',vistaPrincipal, authController.isAuthenticated)
router.get('/usuarios',vistaUsuarios, authController.isAuthenticated)

router.get('/login', (req, res)=>{
    res.render('login', {alert:false, layout:false})
})
router.get('/register', authController.isAuthenticated, (req, res)=>{
    res.render('register', {user:req.user,alert:false})
})


//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router