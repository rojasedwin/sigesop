const express = require('express')
const router =express.Router()


const conexion = require('../database/db')

router.get('/', (req, res) =>{
    
    res.send('Hola mundo')
})


module.exports  = router
