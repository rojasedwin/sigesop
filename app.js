const express = require('express')
const app = express()


app.get('/', (req, res) =>{
    res.send('Hola mundo')
})

app.listen(5000, ()=>{
    console.log('Server running in port: ', 5000)
});