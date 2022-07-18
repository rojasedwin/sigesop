const express = require('express')
const router =express.Router()


const conexion = require('../database/db')

/*conexion.getConnection(function(err, connection) {
    // Usa la conexión
    connection.query( 'SELECT * FROM users', function(err, rows) {
        // Y listo con la conexión.
        connection.release();
        
        // No use la conexión aquí, se ha devuelto al grupo.
    });
});*/

router.get('/', (req, res) =>{
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
                res.send(rows)
            }
            // Y listo con la conexión.
            connection.release();
            
            // No use la conexión aquí, se ha devuelto al grupo.
        });
    })
    
})


module.exports  = router
