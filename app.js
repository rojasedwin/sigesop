const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')


// import the router
app.use('/', require('./routes/router'))
app.use(express.static(path.join(__dirname, '/public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});