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
                    miembro_nos_conocio:miembro_nos_conocio
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
                        ca_primera_vez:primera_vez==0?0:1
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
                miembro_nos_conocio:miembro_nos_conocio,
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
        miembro_nos_conocio:miembro_nos_conocio
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
