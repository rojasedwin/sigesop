const mysql = require('mysql')

/*const conexion = mysql.createConnection({
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'b84edc25641db3',
    password : '36094175',
    database : 'heroku_55e1d1d5ed983d2',
})*/

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
})


/*const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'login_node_jwt',
})*/

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion