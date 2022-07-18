const mysql = require('mysql')

const pool  = mysql.createPool({
//const conexion  = mysql.createConnection({
    host:'us-cdbr-east-05.cleardb.net',
    user:'bf7ce2d52f141a',
    password:'4a1944fd',
    database:'heroku_a1f7b4e8dda28ba',
})

/*conexion.connect(   (error)=>{
    if(error){
        console.log('EL ERROR DE CONEXION ES: '+error)
        return
    }else{
        console.log('Conectado a la BD')
    }
})*/



pool.on('connection', function (connection) {
    console.log("Connected");
    // Establecer una variable de sesión
    //connection.query('SET SESSION auto_increment_increment=1')
});


module.exports = pool