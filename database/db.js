const mysql = require('mysql')

/*const pool  = mysql.createPool({
//const conexion  = mysql.createConnection({
    host:'us-cdbr-east-05.cleardb.net',
    user:'bf7ce2d52f141a',
    password:'4a1944fd',
    database:'heroku_a1f7b4e8dda28ba',
})*/

const pool  = mysql.createPool({
    //const conexion  = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'sianew',
    })

/*conexion.connect(   (error)=>{
    if(error){
        console.log('EL ERROR DE CONEXION ES: '+error)
        return
    }else{
        console.log('Conectado a la BD')
    }
})*/



/*pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
 
  });*/


module.exports = pool