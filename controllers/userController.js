const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify}= require('util')
const moment = require('moment')




//procedure to save
exports.saveusuario = async (req, res) =>{
    try {
        const user_email= req.body.user_email
        const user_name= req.body.user_name
        const user_lastname= req.body.user_lastname
        const user_pwd= req.body.user_pwd
        const user_type= req.body.user_type

        let passHash = await bcryptjs.hash(user_pwd, 10)

        console.log(user_email +" - "+user_name+" - "+passHash)
        //conexion.getConnection(function(err, connection) {


            conexion.query( 'SELECT * FROM users where user_email=?',[user_email], (error, results) =>{
                if(results[0]){


                    console.log('Email existe')

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

    console.log(user_email +" - "+user_name+" - "+passHash+" - "+id+" - "+user_lastname+" - "+user_type)

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

        //let passHash = await bcryptjs.hash(miembro_cedula, 10)
     
        
        
        let nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')

        console.log(miembro_cedula)
       

            
            conexion.query( 'SELECT * FROM miembros where miembro_cedula=?',[miembro_cedula], (error, results) =>{
                if(results[0]){


                    console.log('Cedula existe')

                    conexion.query( 'SELECT * FROM miembros', function(error, misfilas) {
                        if(error){
                            throw error
                        }else{
                             //console.log(rows)   
                             res.render('miembros',{alert:false,alert_miembro:true, user_type:req.session.user_type, user_name:req.session.user_name, rows:misfilas, alertMessage:"Esta Cédula ya fue registrada",
                             mostrarDatos:true,
                             menuactivo:'miembros',                            nombre:miembro_nombres,
                             apellido:miembro_apellidos,
                             cedula:miembro_cedula,
                             telefono:miembro_telefono,
                             sexo:miembro_sexo,
                             nacimiento:miembro_nacimiento,
                             nos_conocio:miembro_nos_conocio,
                             observaciones:miembro_observaciones,
                             horario:miembro_horario,
                            
                            
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
                    miembro_horario:miembro_horario
                    }, (error, results) =>{

                        if(error){
                            throw error
                        }else{
                            res.redirect('miembros')
                            
                        }

                    })
                   
    
                }
            });
            


        
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

        //let passHash = await bcryptjs.hash(miembro_cedula, 10)
     
        
        
        let nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')

        let primera_vez = typeof miembro_primera_vez !== 'undefined' ? miembro_primera_vez : '0'

        console.log(user_id)
        if(miembro_id>0){
            let Sql=conexion.query('UPDATE miembros SET ? WHERE miembro_id = ?', [
                {  
                miembro_nombres:miembro_nombres, 
                miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
                miembro_cedula:miembro_cedula,
                miembro_nacimiento:nacimientoformat,
                miembro_sexo:miembro_sexo,
                miembro_nos_conocio:miembro_nos_conocio,
                miembro_primera_vez:primera_vez
               
            }, miembro_id ], (error, results) => {
                if(error) {
                    console.error(error)
                } else {
                    //console.log(Sql) 
                    //REGISTRO EN TABLA ASISTENCIA CULTO
                    let sql=conexion.query( 'INSERT INTO cultos_asistencia set ?', {
                        miembro_id:miembro_id, 
                        ca_add_by:user_id,
                        ca_primera_vez:primera_vez==0?0:1,
                        ca_horario:ca_horario,
                        ca_observaciones:ca_observaciones
                        }, (error, results) =>{

                            if(error){
                                throw error
                            }else{
                                //console.log(sql)
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
                miembro_nos_conocio:miembro_nos_conocio
                
                    }, (error, results) =>{

                    if(error){
                        throw error
                    }else{
                        let ultimo_id=results.insertId
                        console.log('EL ID insertado es: '+ultimo_id)
                       
                        let sql=conexion.query( 'INSERT INTO cultos_asistencia set ?', {
                            miembro_id:ultimo_id, 
                            ca_add_by:user_id,
                            ca_primera_vez:primera_vez==0?0:1
                            }, (error, results) =>{
    
                                if(error){
                                    throw error
                                }else{
                                    console.log('EL ID insertado es: '+results.insertId)
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
    

    //let passHash = await bcryptjs.hash(miembro_cedula, 10)
    let nacimientoformat = await moment(miembro_nacimiento,"DD/MM/YYYY").format('YYYY-MM-DD')

    console.log(miembro_sexo)

    conexion.query('UPDATE miembros SET ? WHERE miembro_id = ?', [
        {  
        miembro_nombres:miembro_nombres, 
        miembro_apellidos:miembro_apellidos,miembro_telefono:miembro_telefono, 
        miembro_cedula:miembro_cedula,
        miembro_nacimiento:nacimientoformat,
        miembro_sexo:miembro_sexo,
        miembro_nos_conocio:miembro_nos_conocio,
        
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
       
        console.log('Asignado a: '+seguimiento_assigned_to+' el miembro ID: '+miembro_id)

        let sql=conexion.query( 'INSERT INTO seguimientos set ?', {
            miembro_id:miembro_id, 
            seguimiento_assigned_to:seguimiento_assigned_to,
            }, (error, results) =>{

                if(error){
                    throw error
                }else{
                    console.log(sql)
                    console.log('EL ID insertado es: '+results.insertId)
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

    console.log(id+' '+fecha_culto)

    conexion.query('UPDATE miembros SET ? WHERE miembro_id = ?', [{ miembro_asistencia_culto:fecha_culto}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            let dias_semana = ["Domingo", "Lunes", "martes", "Miércoles", "Jueves", "Viernes", "Sábado"] ; 
            //res.redirect('registroweb');

            conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                if(miculto[0]){
                    console.log('Cedula registrada')

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

        console.log(cedula)
      


            conexion.query( 'SELECT * FROM miembros where miembro_cedula=?',[cedula], (error, results) =>{
                if(results[0]){

                    conexion.query( 'SELECT culto_id, abierto_hasta, date_format(fecha_culto,"%Y-%m-%d") as fecha_culto FROM fechas_culto order by culto_id Desc limit 1', function(error, miculto) {
                        if(miculto[0]){
                            console.log('Cedula registrada')

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

                           res.render('sinfechaculto',{mensaje:'Bendiciones, en breves minutos activaremos el registro.'})
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

                           res.render('sinfechaculto',{mensaje:'Bendiciones, en breves minutos activaremos el registro.'})
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

        console.log(miembro_sexo)
       

            
            conexion.query( 'SELECT * FROM miembros where miembro_cedula=?',[miembro_cedula], (error, results) =>{
                if(results[0]){


                    console.log('Cedula existe')

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

        console.log(fecha_culto)
       
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
