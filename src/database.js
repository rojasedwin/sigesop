const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require ('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXION CON LA BASE DE DATOS SE HA CERRADO');
        }

        if (err.code === 'ER_CON_COUNT_EROR') {
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }

        if (err.code === 'ECONNREFUSED') {
            console.error('SE HA RECHAZADO LA CONECCION CON LA BASE DE DATOS');
        }
    }

    if (connection) connection.release();
    console.log('BASE DE DATOS CONECTADA');
    return;
});

//promisify pool.query
pool.query = promisify(pool.query);
module.exports = pool;