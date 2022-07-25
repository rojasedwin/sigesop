const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require("express-session");

const dotenv = require('dotenv')
const { json } = require('express')

app.set('view engine','ejs')
//app.set('views', path.join(__dirname, 'views'))
dotenv.config({path: './env/.env'})
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
    saveUninitialized: true,
    resave: true,
  }));


app.use(cookieParser())



app.use('/', require('./routes/router'))
app.use(express.static(path.join(__dirname, '/public')))

//conexion DB
const conexion = require('./database/db')



const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});