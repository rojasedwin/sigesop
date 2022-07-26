const express = require('express')
const router =express.Router()
//to invoke the methods for the CRUD of users
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { Router } = require('express')

const conexion = require('../database/db')


//RUTAS GET
router.get('/home',authController.isAuthenticated, (req, res) =>{
    
    conexion.getConnection(function(err, connection) {

        connection.query( 'SELECT * FROM miembros where miembro_primera_vez=1', function(error, rows) {
            if(error){
                throw error
            }else{

                const miuser_id = req.session.user_id

                connection.query( 'SELECT * FROM seguimientos s INNER JOIN miembros m ON s.miembro_id=m.miembro_id WHERE seguimiento_assigned_to = ?',[miuser_id], function(error, results) {
                    console.log(req.session.user_id)
                    //console.log(results)
                    res.render('home', {rows:rows, user_type:req.session.user_type, user_name:req.session.user_name, seguimiento:results})

                console.log('BD CONECTADA')

                }) 


                
            }
            connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
    })
    
})

router.get('/register', (req, res) => {
    res.render('register',{alert:false})
})

router.get('/', (req, res) => {
    res.render('index',{alert:false})
})


router.get('/usuarios',authController.isAuthenticated, (req, res) =>{
    
    conexion.getConnection(function(err, connection) {

        connection.query( 'SELECT * FROM users u INNER JOIN tipo_usuario tu ON u.user_type=tu.user_type where user_id!=1964', function(error, rows) {
            if(error){
                throw error
            }else{
                 //console.log(rows)   
                res.render('usuarios', {rows:rows, user_type:req.session.user_type, user_name:req.session.user_name, alert:false})
                 
            }
            connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
    })
    
})

router.get('/logout', authController.logout)



//RUTAS POST
router.post('/registeruser', authController.registeruser)
router.post('/login', authController.login)
router.post('/saveusuario', userController.saveusuario)


module.exports  = router
