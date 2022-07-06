const express = require('express')
const app = express()

app.set('view engine', 'ejs')


// import the router
app.use('/', require('./routes/router'))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});