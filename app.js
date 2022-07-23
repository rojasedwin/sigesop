const express = require('express')
const app = express()
const path = require('path')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/router'))

//conexion DB
const conexion = require('./database/db')



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});