//2 - Invocamos a MySQL y realizamos la conexion
//const mysql = require('mysql');
// const connection = mysql.createConnection({
//     //Con variables de entorno
//     host     : process.env.DB_HOST,
//     user     : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_DATABASE
// });

//error
// connection.connect((error)=>{
//     if (error) {
//       console.error('El error de conexión es: ' + error);
//       return;
//     }
//     console.log('¡Conectado a la Base de Datos!');
//   });

//   module.exports = connection;


// var pool  = mysql.createPool({
//     connectionLimit : 20,
//     host            : 'us-cdbr-east-05.cleardb.net',
//     user            : 'bf7ce2d52f141a',
//     password        : '4a1944fd',
//     database        : 'heroku_a1f7b4e8dda28ba'
//   });
  
//   pool.query('SELECT * from users', function (error, results, fields) {
//     if (error) throw error;
//     //console.log(results[0]);
//   });

//   module.exports = pool;

  
