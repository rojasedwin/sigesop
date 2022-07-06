const mysql = require('mysql')
// mysql://bf7ce2d52f141a:4a1944fd@us-cdbr-east-05.cleardb.net/heroku_a1f7b4e8dda28ba?reconnect=true
/*const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
})*/

const conexion = mysql.createConnection({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'bf7ce2d52f141a',
    password : '4a1944fd',
    database : 'heroku_a1f7b4e8dda28ba'
})

/*const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sianew'
})*/

conexion.connect ((error) => {
    if(error) {
        console.error('The connection error is:' + error)
        return
    }
    console.log('Connected to the database MySQL!')
})

module.exports = conexion