const express = require('express')
const router = express.Router()


//Invoke the database connection
const conexion = require('../database/db')

router.get('/', (req, res) => {
   //res.send('Hola soy mundo');
   // conexion.query('SELECT * FROM users', (error, results) =>{
   //    if(error){
   //       throw error;
   //    }else{
   //       res.send(results);
   //    }
   // })
   res.render('index')
})


module.exports = router;