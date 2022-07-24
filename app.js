const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv')
const { json } = require('express')

app.set('view engine','ejs')
//app.set('views', path.join(__dirname, 'views'))
dotenv.config({path: './env/.env'})
app.use(express.urlencoded({extended:false}))


//app.use(cookieParser)



app.use('/', require('./routes/router'))
app.use(express.static(path.join(__dirname, '/public')))

//conexion DB
const conexion = require('./database/db')



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});