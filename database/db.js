const mysql = require('mysql')

/*const pool  = mysql.createPool({
    host:'us-cdbr-east-05.cleardb.net',
    user:'bf7ce2d52f141a',
    password:'4a1944fd',
    database:'heroku_a1f7b4e8dda28ba',
})*/

const pool  = mysql.createPool({
//const conexion  = mysql.createConnection({
    host:'b2ng7rktqi1ms5p0ja5a-mysql.services.clever-cloud.com',
    user:'ulg9zevivcttjr7d',
    password:'2NYywA8r4L2RxeleMrBP',
    database:'b2ng7rktqi1ms5p0ja5a',
})

/*const pool  = mysql.createPool({
    //const conexion  = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'sianew',
    })*/

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

  //ACtualizar miembros a verificado los datos
  //update miembros set miembro_verificado=1 where miembro_id in(SELECT miembro_id FROM `cultos_asistencia` where date(ca_fecha_culto)='2022-08-21');


module.exports = pool