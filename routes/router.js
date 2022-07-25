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
       // connection.query('SELECT * FROM users WHERE user_email = ?', [email], function(error, rows) {
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


               /* conexion.query('SELECT * FROM seguimientos as s INNER JOIN MIEMBROS as m ON m.miembro_id=s.seguimiento_id INNER JOIN users as u ON u.user_id=s.seguimiento_assigned_to WHERE s.seguimiento_assigned_to = ?', [req.session.user_id],function (error, rows)=>{

                    if(error){
                        throw error       
                    }else{

                    }

                })  */


                /*res.render('home', {rows:rows, user_type:req.session.user_type, user_name:req.session.user_name})
               
               
               
                console.log('BD CONECTADA')*/
                
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
