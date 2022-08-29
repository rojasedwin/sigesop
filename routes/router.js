const express = require('express')
const router =express.Router()
//to invoke the methods for the CRUD of users
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const { Router } = require('express')

const conexion = require('../database/db')
const moment = require('moment')


//RUTAS GET
router.get('/home',authController.isAuthenticated, (req, res) =>{
    
    conexion.getConnection(function(err, connection) {

        let sql=connection.query( 'SELECT ca.*, m.*, mi.*, s.seguimiento_id FROM cultos_asistencia ca INNER JOIN miembros m ON ca.miembro_id=m.miembro_id LEFT OUTER JOIN seguimientos s ON s.miembro_id=m.miembro_id LEFT OUTER JOIN ministros mi ON mi.ministro_id=s.seguimiento_assigned_to WHERE DATE_FORMAT(ca.ca_fecha_culto, "%Y-%m-%d") = CURDATE()', function(error, rows) {
            if(error){
                throw error
            }else{
                   //console.log(rows) 
                const miuser_id = req.mi_user_id
                //POR USER_ID
                /*connection.query( 'SELECT * FROM seguimientos s INNER JOIN miembros m ON s.miembro_id=m.miembro_id WHERE seguimiento_assigned_to = ?',[miuser_id], function(error, results) {*/

                let sql=connection.query('SELECT m.*,YEAR(CURDATE())-YEAR(m.miembro_nacimiento)  AS edad_actual FROM miembros m WHERE EXTRACT( DAY from m.miembro_nacimiento)=DAY(NOW()) AND EXTRACT( MONTH from m.miembro_nacimiento)=MONTH(NOW())', function(error, resultados) {
                    
                    if(error){
                        throw error
                    }else{
                        //CUMPLEAÑOS DEL MES    
                        let sql=connection.query('SELECT m.*,YEAR(CURDATE())-YEAR(m.miembro_nacimiento)  AS edad_actual FROM miembros m WHERE EXTRACT( MONTH from m.miembro_nacimiento)=MONTH(NOW())', function(error, results) {
                    
                            if(error){
                                throw error
                            }else{
                                //console.log(resultados)
                                //console.log(cumplemes)

                                res.render('home', {rows:rows, user_type:req.mi_user_type, user_name:req.mi_user_name, seguimiento:rows, mostrarDatos:false, alert:false, alert_miembro:false,menuactivo:'home',
                                titulo_pagina:'Dashboard'
                                ,cumpleanios:resultados
  
                                
                                })//FIN RENDERIZADO



                            }

                        })
                        


                        
        
                    
                    
                    
                    
                    
                    
                    }
                    
                })

               
               
                

                
            }
            connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
    })
    
})

/*router.get('/register', (req, res) => {
    res.render('register',{alert:false})
})*/

router.get('/registroweb', (req, res) => {
    //res.render('registroweb',{alert:false, mostrarform:false})

    let dias_semana = ["Domingo", "Lunes", "martes", "Miércoles", "Jueves", "Viernes", "Sábado"] ; 
    

    conexion.query( 'SELECT culto_id, date_format(abierto_hasta,"%Y-%m-%d") as abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
        if(miculto[0]){
            //console.log(dias_semana)

            dia_culto=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('DD-MM-YYYY')

            mi_dia=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('d')

            if(moment().format('YYYY-MM-DD')>miculto[0].abierto_hasta){
                console.log('cerrar pagina')
                res.render('sinfechaculto', {mensaje:'Bendiciones, en breve activaremos el registro.'})
            }else{
                res.render('registroweb', {
                    alert:false, 
                    mostrarform:false,
                    dia_culto:dia_culto,
                    dias_semana:dias_semana,
                    mi_dia:mi_dia,
                    alert_registro:false
                    
                })
            }
        }else{

           res.render('sinfechaculto', {mensaje:'Bendiciones, en breve activaremos el registro.'})
        }
    })        

})

router.get('/', (req, res) => {
    res.render('index',{alert:false})
})


router.get('/usuarios',authController.isAuthenticated, (req, res) =>{
    
    //conexion.getConnection(function(err, connection) {

        conexion.query( 'SELECT * FROM users u INNER JOIN tipo_usuario tu ON u.user_type=tu.user_type where user_id!=1964', function(error, rows) {
            if(error){
                throw error
            }else{
                 //console.log(rows)   
                res.render('usuarios', {rows:rows, user_type:req.mi_user_type, user_name:req.mi_user_name, alert:false,alert_miembro:false,mostrarDatos:false, menuactivo:'usuario', titulo_pagina:'Usuarios'})
                 
            }
            //connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
   // })
    
})//fin usuarios GET

router.get('/cumpleanios',authController.isAuthenticated, (req, res) =>{
    
    //conexion.getConnection(function(err, connection) {

        conexion.query( 'SELECT m.*,YEAR(CURDATE())-YEAR(m.miembro_nacimiento)  AS edad_actual FROM miembros m WHERE EXTRACT( DAY from m.miembro_nacimiento)=DAY(NOW()) AND EXTRACT( MONTH from m.miembro_nacimiento)=MONTH(NOW())', function(error, rows) {
            if(error){
                throw error
            }else{

                //CUMPLEAÑOS DEL MES    
                let sql=conexion.query('SELECT m.*,YEAR(CURDATE())-YEAR(m.miembro_nacimiento)  AS edad_actual, date_format(m.miembro_nacimiento,"%d-%m-%Y") as fecha_nac, date_format(m.miembro_nacimiento,"%Y-%m-%d") as nac FROM miembros m WHERE EXTRACT( MONTH from m.miembro_nacimiento)=MONTH(NOW()) ORDER BY fecha_nac Asc', function(error, cumplemes) {
                    
                    if(error){
                        throw error
                    }else{
                       
                        console.log('DIA ACTUAL ES: '+moment().format('DD-MM-YYYY'))   
                        
                        res.render('cumpleanios', {cumpleanios:rows, cumplemes:cumplemes, user_type:req.mi_user_type, user_name:req.mi_user_name, alert:false,alert_miembro:false,mostrarDatos:false, menuactivo:'home', titulo_pagina:'Cumpleaños'
                        ,dia_actual:moment().format('DD-MM-YYYY')
                    })//FIN RENDERIZADO

                    }//fin de errores

                })//fin query sql


                 //console.log(rows)   
                
                 
            }
            //connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
   // })
    
})//fin CUMPLEANIOS GET

router.get('/miembros',authController.isAuthenticated, (req, res) =>{
    
    //conexion.getConnection(function(err, connection) {

        conexion.query( 'SELECT m.*,date_format(m.miembro_nacimiento,"%d-%m-%Y") as fecha_nac FROM miembros m', function(error, rows) {
            if(error){
                throw error
            }else{
                 //console.log(rows)   
                //res.send(rows)
                res.render('miembros', {rows:rows, 
                   
                    alert_miembro:false,alert:false,mostrarDatos:false, menuactivo:'miembros'
                ,user_name:req.mi_user_name
                ,user_type:req.mi_user_type,
                titulo_pagina:'Miembros'
            })
                 
            }
            //connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
   // })
    
})

router.get('/registroasistencia',authController.isAuthenticated, (req, res) =>{
    
    //conexion.getConnection(function(err, connection) {

        let sql=conexion.query( 'SELECT m.*,date_format(m.miembro_nacimiento,"%d-%m-%Y") as fecha_nac, ca.ca_id, ca.ca_horario, ca.ca_fecha_culto FROM miembros m LEFT OUTER JOIN cultos_asistencia ca ON m.miembro_id=ca.miembro_id and DATE(ca.ca_fecha_culto) = CURDATE()', function(error, rows) {
            if(error){
                throw error
            }else{
               // console.log(sql)   
                //res.send(rows)
                res.render('registroasistencia', {rows:rows, 
                   
                    alert_miembro:false,alert:false,mostrarDatos:false, menuactivo:'registroasistencia'
                ,user_name:req.mi_user_name
                ,user_type:req.mi_user_type
                ,user_id:req.mi_user_id
                ,titulo_pagina:'Registro Asistencia'
            })
                 
            }
            //connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
   // })
    
})

router.get('/logout', authController.logout)

router.get('/aperturaservicio',authController.isAuthenticated, (req, res) =>{
    
    //conexion.getConnection(function(err, connection) {

        conexion.query( 'SELECT culto_id, date_format(abierto_hasta, "%d-%m-%Y") as abierto_hasta, date_format(fecha_culto,"%d-%m-%Y") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, rows) {
            if(error){
                throw error
            }else{
                 //console.log(rows)   
                res.render('aperturaservicio', {rows:rows, user_type:req.mi_user_type, user_name:req.mi_user_name, alert:false,alert_miembro:false,mostrarDatos:false, menuactivo:'aperturaservicio', titulo_pagina:'Servicios'})
                 
            }
            //connection.release();
            // No use la conexión aquí, se ha devuelto al grupo.
        });
   // })
    
})//fin apertura servicio web GET

router.get('/asistenciaregistroweb',authController.isAuthenticated, (req, res) =>{
    
    conexion.query( 'SELECT culto_id, date_format(abierto_hasta, "%d-%m-%Y") as abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, rows) {
        if(error){
            throw error
        }else{
             dia_culto=rows[0].fecha_culto

             console.log(dia_culto)

             conexion.query( 'SELECT m.*,date_format(m.miembro_nacimiento,"%d-%m-%Y") as fecha_nac FROM miembros m where m.miembro_asistencia_culto=?',[dia_culto], (error, results) =>{

                if(error){
                    throw error
                }else{
                     //console.log(results)   
                    //res.send(rows)
                    res.render('asistenciaregistroweb', {rows:results, 
                       
                        alert_miembro:false,alert:false,mostrarDatos:false, menuactivo:'asistenciaregistroweb'
                    ,user_name:req.mi_user_name
                    ,user_type:req.mi_user_type,
                    titulo_pagina:'Registro Web'
                })
                     
                }


            })
             
        }
        
    })

        
  
})//ASISTENCIA REGISTRO WEB

//REGISTRO EVENTOS MPJ
router.get('/registrompj', (req, res) => {
    

    res.render('registrompj', {
        alert:false, 
         alert_registro:false,
         alert_error_cedula:false,
         mostrarDatosMpj:false
        
        
    })

})




//Guardar POST
router.post('/registeruser', authController.registeruser)
router.post('/login', authController.login)
router.post('/saveusuario', userController.saveusuario)
router.post('/savemiembro', userController.savemiembro)
router.post('/saveservicio', userController.saveservicio)
router.post('/savemiembroregistro', userController.savemiembroregistro)
router.post('/saveeventompj', userController.saveeventompj)
router.post('/saveregistroasistencia', userController.saveregistroasistencia)
router.post('/asignarseguimiento', userController.asignarseguimiento)

router.post('/searchcedula', userController.searchcedula)
router.post('/confirmarregistroweb', userController.confirmarregistroweb)

//Editar (POST)
router.post('/editarusuario', userController.editarusuario)
router.post('/editarmiembro', userController.editarmiembro)
//Eliminar POST
router.get('/deleteuser/:id', ( req, res ) =>{
    const id=req.params.id

   
    conexion.query('DELETE FROM users WHERE user_id=?', [id], (error, results) =>{
        if(error){
         throw error;
        }else{
            res.redirect('/usuarios')
           // console.log('eliminado el user_id: '+id)
        }
    
    })
    
});

router.get('/deletemiembro/:id', ( req, res ) =>{
    const id=req.params.id

   
    conexion.query('DELETE FROM miembros WHERE miembro_id=?', [id], (error, results) =>{
        if(error){
         throw error;
        }else{
            res.redirect('/miembros')
           // console.log('eliminado el user_id: '+id)
        }
    
    })
    
});


module.exports  = router
