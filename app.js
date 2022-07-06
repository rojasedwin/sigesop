const express = require('express')
const app = express()

app.set('view engine', 'ejs')


app.get('/', (req, res) =>{
    res.send('Hola mundo')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server running in port: ', PORT)
});