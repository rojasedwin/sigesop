const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify}= require('util')
const moment = require('moment')
const { exit } = require('process')




//procedure to save
exports.saveusuario = async (req, res) =>{
    try {
        const user_email= req.body.user_email
        const user_name= req.body.user_name
        const user_lastname= req.body.user_lastname
        const user_pwd= req.body.user_pwd
        const user_type= req.body.user_type

        let passHash = await bcryptjs.hash(user_pwd, 10)

        //console.log(user_email +" - "+user_name+" - "+passHash)
        //conexion.getConnection(function(err, connection) {


            conexion.query( 'SELECT * FROM users where user_email=?',[user_email], (error, results) =>{
                if(results[0]){


                    //console.log('Email existe')

                    conexion.query( 'SELECT * FROM users u INNER JOIN tipo_usuario tu ON u.user_type=tu.user_type where user_id!=1964', function(error, misfilas) {
                        if(error){
                            throw error
                        }else{
                             //console.log(rows)   
                             res.render('usuarios',{alert:true, user_type:req.session.user_type, user_name:req.session.user_name, rows:misfilas, alertMessage:"Este Email ya fue registrado",
                             mostrarDatos:true,
                             menuactivo:'usuario',
                             alert_miembro:false,   
                             username:user_name,
                             user_lastname:user_lastname,
                             user_email:user_email,
                             user_pwd:user_pwd,
                             user_type:user_type
                            
                            })
                             
                        }
                       
                    });



                    
                } else {

                    // Usa la conexión
                    conexion.query( 'INSERT INTO users set ?', {user_email:user_email, user_name:user_name,user_lastname:user_lastname, user_pwd:passHash, user_type:user_type}, (error, results) =>{

                        if(error){
                            throw error
                        }else{
                            res.redirect('usuarios')
                            
                        }

                    })
                   
    
                }
            });   

            
        //})



        
    } catch (error) {
        console.error(error)
    }
}

module.exports.editarusuario = async (req,res)=>{
    const id = req.body.user_id
    const user_email= req.body.user_email
    const user_name= req.body.user_name
    const user_lastname= req.body.user_lastname
    const user_pwd= req.body.user_pwd
    const user_type= req.body.user_type

    let passHash = await bcryptjs.hash(user_pwd, 10)

    //console.log(user_email +" - "+user_name+" - "+passHash+" - "+id+" - "+user_lastname+" - "+user_type)

    conexion.query('UPDATE users SET ? WHERE user_id = ?', [{ user_name:user_name, user_email:user_email, user_lastname:user_lastname,  user_type:user_type}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('usuarios');
        }
    })
    
}


exports.savemiembro = async (req, res) =>{
    try {
        const miembro_nombres= req.body.miembro_nombres
        const miembro_apellidos= req.body.miembro_apellidos
        const miembro_sexo= req.body.miembro_sexo
        const miembro_telefono= req.body.miembro_telefono
        const miembro_nacimiento= req.body.miembro_nacimiento
        const miembro_nos_conocio= req.body.miembro_nos_conocio
        const miembro_cedula= req.body.miembro_cedula
        const miembro_observaciones= req.body.miembro_observaciones
        const miembro_horario= req.body.miembro_horario
        const miembro_add_by=req.body.user_id_actual
       

          
        
        
        let nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')

       //console.log(miembro_cedula)
       

            
           conexion.query( 'SELECT * FROM miembros where miembro_cedula=?',[miembro_cedula], (error, results) =>{
                if(results[0]){


                    //console.log('Cedula existe')

                    conexion.query( 'SELECT * FROM miembros', function(error, misfilas) {
                        if(error){
                            throw error
                        }else{
                             //console.log(rows)   
                             res.render('miembros',{alert:false,alert_miembro:true, user_type:req.session.user_type, user_name:req.session.user_name, rows:misfilas, alertMessage:"Esta Cédula ya fue registrada",
                             mostrarDatos:true,
                             menuactivo:'miembros',                           
                             nombre:miembro_nombres,
                             apellido:miembro_apellidos,
                             cedula:miembro_cedula,
                             telefono:miembro_telefono,
                             sexo:miembro_sexo,
                             nacimiento:miembro_nacimiento,
                             nos_conocio:miembro_nos_conocio,
                             observaciones:miembro_observaciones,
                             horario:miembro_horario,
                            miembro_add_by:miembro_add_by,
                            
                            
                            })
                             
                        }
                       
                    });



                    
                } else {
                       //res.send('ahora inserto') 
                    // Usa la conexión
                    conexion.query( 'INSERT INTO miembros set ?', {miembro_nombres:miembro_nombres, miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
                    miembro_cedula:miembro_cedula,
                    miembro_nacimiento:nacimientoformat,
                    miembro_sexo:miembro_sexo,
                    miembro_nos_conocio:miembro_nos_conocio,
                    miembro_observaciones:miembro_observaciones,
                    miembro_horario:miembro_horario,
                    miembro_verificado:1,
                    miembro_add_by:miembro_add_by
                    }, (error, results) =>{

                        if(error){
                            throw error
                        }else{
                            res.redirect('miembros')
                            
                        }

                    })
                   
    
                }
            });//fin conexion
            


        
    } catch (error) {
        console.error(error)
    }
}//FIN SAVE MIEMBRO



exports.saveregistroasistencia = async (req, res) =>{
    try {
        const miembro_nombres= req.body.miembro_nombres
        const miembro_apellidos= req.body.miembro_apellidos
        const miembro_sexo= req.body.miembro_sexo
        const miembro_telefono= req.body.miembro_telefono
        const miembro_nacimiento= req.body.miembro_nacimiento
        const miembro_nos_conocio= req.body.miembro_nos_conocio
        const miembro_cedula= req.body.miembro_cedula
        const miembro_primera_vez= req.body.miembro_primera_vez
        const miembro_id= req.body.miembro_id
        const user_id= req.body.add_by
        const ca_horario= req.body.miembro_horario
        const ca_observaciones= req.body.miembro_observaciones
        const ca_add_by= req.body.user_id_actual

        //let passHash = await bcryptjs.hash(miembro_cedula, 10)
        console.log('nacimiento formulario-->'+miembro_nacimiento)
       
        let nacimientoformat="1900-01-01"
       
        if(miembro_nacimiento!="01/01/1900" && miembro_nacimiento!=""){
        nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')
        }else{
            nacimientoformat ="1900-01-01";
        }
        console.log('mi nacimiento-->'+nacimientoformat)


        let primera_vez = typeof miembro_primera_vez !== 'undefined' ? miembro_primera_vez : '0'

               
        if(miembro_id>0){
           
            let Sql=conexion.query('UPDATE miembros SET ? WHERE miembro_id = ?', [
                {  
                miembro_nombres:miembro_nombres, 
                miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
                miembro_cedula:miembro_cedula,
                miembro_nacimiento:nacimientoformat,
                miembro_sexo:miembro_sexo,
                miembro_nos_conocio:miembro_nos_conocio,
                miembro_primera_vez:primera_vez,
                miembro_verificado:1
               
            }, miembro_id ], (error, results) => {
                if(error) {
                    console.error(error)
                } else {
                    //console.log(Sql) 
                    //REGISTRO EN TABLA ASISTENCIA CULTO
                    let sql=conexion.query( 'INSERT INTO cultos_asistencia set ?', {
                        miembro_id:miembro_id, 
                       // ca_add_by:1,
                        ca_primera_vez:primera_vez==0?0:1,
                        ca_horario:ca_horario,
                        ca_observaciones:ca_observaciones,
                        ca_add_by:ca_add_by
                        }, (error, results) =>{

                            if(error){
                                throw error
                            }else{
                               // console.log(sql)
                                res.redirect('registroasistencia');
                                
                            }

                        })



                
                }
            })

        }//EXISTE MIEMBRO
        else{

            conexion.query( 'INSERT INTO miembros set ?', {miembro_nombres:miembro_nombres, miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
                miembro_cedula:miembro_cedula,
                miembro_nacimiento:nacimientoformat,
                miembro_sexo:miembro_sexo,
                miembro_nos_conocio:miembro_nos_conocio,
                miembro_add_by:ca_add_by
                
                    }, (error, results) =>{

                    if(error){
                        throw error
                    }else{
                        let ultimo_id=results.insertId
                        //console.log('EL ID insertado es: '+ultimo_id)
                        console.log('ES NUEVO MIEMBRO: '+nacimientoformat)
                       
                        let sql=conexion.query( 'INSERT INTO cultos_asistencia set ?', {
                            miembro_id:ultimo_id, 
                            //ca_add_by:user_id,
                            ca_primera_vez:primera_vez==0?0:1,
                            ca_horario:ca_horario,
                        ca_observaciones:ca_observaciones,
                        ca_add_by:ca_add_by
                            }, (error, results) =>{
    
                                if(error){
                                    throw error
                                }else{
                                    //console.log('EL ID insertado es: '+results.insertId)
                                    res.redirect('registroasistencia');
                                    
                                }
    
                            })

                    }

                })

        }

            
           
            


        
    } catch (error) {
        console.error(error)
    }
}//FIN SAVE REGISTRO ASISTENCIA



module.exports.editarmiembro = async (req,res)=>{

    const id = req.body.miembro_id
    const miembro_nombres= req.body.miembro_nombres
    const miembro_apellidos= req.body.miembro_apellidos
    const miembro_sexo= req.body.miembro_sexo
    const miembro_telefono= req.body.miembro_telefono
    const miembro_nacimiento= req.body.miembro_nacimiento
    const miembro_nos_conocio= req.body.miembro_nos_conocio
    const miembro_cedula= req.body.miembro_cedula
    
    console.log('nacimiento form '+miembro_nacimiento)
    //let passHash = await bcryptjs.hash(miembro_cedula, 10)
    let nacimientoformat="0000-00-00";
    if(miembro_nacimiento!=""){
        nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')
    }

    console.log('nacimiento '+nacimientoformat)

    conexion.query('UPDATE miembros SET ? WHERE miembro_id = ?', [
        {  
        miembro_nombres:miembro_nombres, 
        miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
        miembro_cedula:miembro_cedula,
        miembro_nacimiento:nacimientoformat,
        miembro_sexo:miembro_sexo,
        miembro_nos_conocio:miembro_nos_conocio,
        miembro_verificado:1
        
    }, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('miembros');
        }
    })
    
}

module.exports.asignarseguimiento = (req, res) =>{
    try {
        const seguimiento_assigned_to= req.body.seguimiento_assigned_to
        const miembro_id= req.body.miembro_id
       
        //console.log('Asignado a: '+seguimiento_assigned_to+' el miembro ID: '+miembro_id)

        let sql=conexion.query( 'INSERT INTO seguimientos set ?', {
            miembro_id:miembro_id, 
            seguimiento_assigned_to:seguimiento_assigned_to,
            }, (error, results) =>{

                if(error){
                    throw error
                }else{
                    //console.log(sql)
                    //console.log('EL ID insertado es: '+results.insertId)
                    res.redirect('home')
                    
                }

            })
       

            
            
            


        
    } catch (error) {
        console.error(error)
    }
}//FIN ASIGNAR SEGUIMIENTO


module.exports.confirmarregistroweb = (req,res)=>{
    const id = req.body.miembro_id
    const fecha_culto = req.body.fecha_culto
   
    //let passHash = await bcryptjs.hash(user_pwd, 10)

    //console.log(id+' '+fecha_culto)

    conexion.query('UPDATE miembros SET ? WHERE miembro_id = ?', [{ miembro_asistencia_culto:fecha_culto}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            let dias_semana = ["Domingo", "Lunes", "martes", "Miércoles", "Jueves", "Viernes", "Sábado"] ; 
            //res.redirect('registroweb');

            conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                if(miculto[0]){
                    //console.log('Cedula registrada')

                    dia_culto=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('DD-MM-YYYY')

                    mi_dia=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('d')

                    res.render('registroweb', {
                        results:results
                        ,miculto:miculto
                        ,mostrarform:false
                        ,mostrarDatos:false
                       ,dias_semana:dias_semana,
                        mi_dia:mi_dia,
                        alert_registro:true
                    })
                }else{

                   res.render('sinfechaculto',{mensaje:'Bendiciones, en breves minutos activaremos el registro.'})
                }
            })        


        }
    })
    
}


exports.searchcedula =  (req, res) =>{
    try {
        const cedula= req.body.cedula
       
        let dias_semana = ["Domingo", "Lunes", "martes", "Miércoles", "Jueves", "Viernes", "Sábado"] ; 

       // let passHash =  bcryptjs.hash(cedula, 10)

        //console.log(cedula)
      


            conexion.query( 'SELECT * FROM miembros where miembro_cedula=?',[cedula], (error, results) =>{
                if(results[0]){

                    conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                        if(miculto[0]){
                            //console.log('Cedula registrada')

                            dia_culto=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('DD-MM-YYYY')

                            mi_dia=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('d')

                            res.render('registroweb', {
                                results:results
                                ,miculto:miculto
                                ,mostrarform:true
                               ,dias_semana:dias_semana,
                                mi_dia:mi_dia,
                                alert_registro:false
                            })
                        }else{

                           res.render('sinfechaculto',{mensaje:'Bendiciones, en breve activaremos el registro.'})
                        }
                    })        

                    
                   

                    
                } else {
                    conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                        if(miculto[0]){

                            dia_culto=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('DD-MM-YYYY')

                            mi_dia=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('d')

                             res.render('registrowebnuevo', {
                                miculto:miculto
                                ,alert_miembro:false
                                ,mostrarDatos:false
                                ,dias_semana:dias_semana,
                                mi_dia:mi_dia,
                                cedula:cedula
                             })
                        }else{

                           res.render('sinfechaculto',{mensaje:'Bendiciones, en breve activaremos el registro.'})
                        }
                    })        
    
                }
            });   

            
        //})



        
    } catch (error) {
        console.error(error)
    }
}

exports.savemiembroregistro = async (req, res) =>{
    try {
        const miembro_nombres= req.body.miembro_nombres
        const miembro_apellidos= req.body.miembro_apellidos
        const miembro_sexo= req.body.miembro_sexo
        const miembro_telefono= req.body.miembro_telefono
        const miembro_nacimiento= req.body.miembro_nacimiento
        const miembro_cedula= req.body.miembro_cedula
        const miembro_asistencia_culto= req.body.fecha_culto

        //let passHash = await bcryptjs.hash(miembro_cedula, 10)
     
        let dias_semana = ["Domingo", "Lunes", "martes", "Miércoles", "Jueves", "Viernes", "Sábado"] ; 
        
        let nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')

        //console.log(miembro_sexo)
       

            
            conexion.query( 'SELECT * FROM miembros where miembro_cedula=?',[miembro_cedula], (error, results) =>{
                if(results[0]){


                    //console.log('Cedula existe')

                    conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                        if(error){
                            throw error
                        }else{
                             //console.log(rows)   

                             dia_culto=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('DD-MM-YYYY')

                             mi_dia=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('d')

                             res.render('registrowebnuevo',{alert:false,alert_miembro:true, 
                            miculto:miculto, alertMessage:"Esta Cédula ya fue registrada",
                             mostrarDatos:true,
                             nombre:miembro_nombres,
                             apellido:miembro_apellidos,
                             cedula:miembro_cedula,
                             telefono:miembro_telefono,
                             sexo:miembro_sexo,
                             nacimiento:miembro_nacimiento,
                             dias_semana:dias_semana,
                             mi_dia:mi_dia
                                                        
                            
                            })
                             
                        }
                       
                    });



                    
                } else {
                       //res.send('ahora inserto') 
                    // Usa la conexión
                    conexion.query( 'INSERT INTO miembros set ?', {miembro_nombres:miembro_nombres, miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
                    miembro_cedula:miembro_cedula,
                    miembro_nacimiento:nacimientoformat,
                    miembro_sexo:miembro_sexo,
                    miembro_asistencia_culto:miembro_asistencia_culto,

                    }, (error, results) =>{

                        if(error){
                            throw error
                        }else{
                            //res.redirect('registroweb')

                            conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                                if(miculto[0]){
                                         
                                    dia_culto=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('DD-MM-YYYY')
        
                                    mi_dia=moment(miculto[0].fecha_culto,"YYYY-MM-DD").format('d')
        
                                    res.render('registroweb', {
                                        miculto:miculto
                                        ,mostrarform:false
                                       ,dias_semana:dias_semana,
                                        mi_dia:mi_dia,
                                        alert_registro:true
                                    })
                                }else{
        
                                   res.render('sinfechaculto',{mensaje:'Bendiciones, en breves minutos activaremos el registro.'})
                                }
                            })  

                            


                            





                            
                            
                        }

                    })
                   
    
                }
            });
            


        
    } catch (error) {
        console.error(error)
    }
}//FIN SAVE MIEMBRO



exports.saveservicio = async (req, res) =>{
    try {
        const fecha_culto= req.body.fecha_culto
        const abierto_hasta= req.body.abierto_hasta
        

        //let passHash = await bcryptjs.hash(miembro_cedula, 10)
     
        
        
        let fechacultoformat = await moment(fecha_culto,"DD/MM/YYYY").format('YYYY-MM-DD')

        let abiertohastaformat = await moment(abierto_hasta,"DD/MM/YYYY").format('YYYY-MM-DD')

        //console.log(fecha_culto)
       
        conexion.query( 'INSERT INTO fechas_culto set ?', {fecha_culto:fechacultoformat, abierto_hasta:abiertohastaformat
            
            }, (error, results) =>{

                if(error){
                    throw error
                }else{
                    res.redirect('aperturaservicio')
                    
                }

            })
            


        
    } catch (error) {
        console.error(error)
    }
}//FIN SAVE SERVICIO


//SAVE EVENTO MPJ
exports.saveeventompj = async (req, res) =>{
    try {
        const evento_nombre= req.body.evento_nombre
        const evento_apellido= req.body.evento_apellido
        const evento_email= req.body.evento_email
        const evento_cedula= req.body.evento_cedula
        const evento_telefono= req.body.evento_telefono
        const evento_cargo= req.body.evento_cargo
        const evento_estado= req.body.evento_estado
        const evento_coordinador_zona= req.body.evento_coordinador_zona
        const evento_ministerio_nombre= req.body.evento_ministerio_nombre
        const evento_cobertura= req.body.evento_cobertura
       

        //let passHash = await bcryptjs.hash(miembro_cedula, 10)
     
       // let dias_semana = ["Domingo", "Lunes", "martes", "Miércoles", "Jueves", "Viernes", "Sábado"] ; 
        
        //let nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')

        //console.log(evento_cedula)
       
        conexion.query( 'INSERT INTO eventos set ?', {evento_nombre:evento_nombre, 
            evento_apellido:evento_apellido, 
            evento_cedula:evento_cedula, 
            evento_correo:evento_email, 
            evento_telefono:evento_telefono, 
            evento_cargo:evento_cargo, 
            evento_estado:evento_estado, 
            evento_coordinador_zona:evento_coordinador_zona, 
            evento_ministerio_nombre:evento_ministerio_nombre, 
            evento_cobertura:evento_cobertura,

        }, (error, results) =>{

            if(error){
                throw error
            }else{

                res.render('registrompj', {
                    alert:false, 
                     alert_registro:true,
                     alert_error_cedula:false,
                     mostrarDatosMpj:false
                    
                    
                })
               

                
                
            }

        })
            


        
    } catch (error) {
        console.error(error)
    }
}//FIN SAVE EVENTO MPJ
