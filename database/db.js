const mysql = require('mysql')

const conexion = mysql.createConnection({
    
    host : 'us-cdbr-east-05.cleardb.net',
 
    user : 'bf7ce2d52f141a',
   
    password : '4a1944fd',
  
    database : '	heroku_a1f7b4e8dda28ba',
})

/*const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
})*/


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