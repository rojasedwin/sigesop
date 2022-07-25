const express = require('express')
const router =express.Router()
//to invoke the methods for the CRUD of users
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { Router } = require('express')

const conexion = require('../database/db')



/*conexion.getConnection(function(err, connection) {
    // Usa la conexión
    connection.query( 'SELECT * FROM users', function(err, rows) {
        // Y listo con la conexión.
        connection.release();
        
        // No use la conexión aquí, se ha devuelto al grupo.
    });
});*/

router.get('/home',authController.isAuthenticated, (req, res) =>{
    //res.render('index')
    /*conexion.query('SELECT * from users', (error, results) =>{
        if(error){
            throw error
        }else{
            res.send(results)
        }
    })*/

    conexion.getConnection(function(err, connection) {
        // Usa la conexión
        connection.query( 'SELECT * FROM users', function(error, rows) {
            if(error){
                throw error
            }else{
                res.render('home', {rows:rows})
                console.log('BD CONECTADA')
            }
            // Y listo con la conexión.
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

router.get('/logout', authController.logout)

router.post('/registeruser', authController.registeruser)
router.post('/login', authController.login)


module.exports  = router
