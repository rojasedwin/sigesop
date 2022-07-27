const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify}= require('util')


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
                    conexion.query( 'INSERT INTO users set ?', {user_email:user_email, user_name:user_name, user_pwd:passHash, user_type:user_type}, (error, results) =>{

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