const express = require('express')
const app = express()

app.set('View engine','ejs')

app.use('/', require('./routes/router'))

//conexion DB
const conexion = require('./database/db')



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});