const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify}= require('util')


//register user

exports.registeruser = async (req, res) =>{
    try {
        const user_email= req.body.user_email
        const user_name= req.body.user_name
        const user_pwd= req.body.user_pwd

        let passHash = await bcryptjs.hash(user_pwd, 10)

        //console.log(user_email +" - "+user_name+" - "+passHash)
        //conexion.getConnection(function(err, connection) {


            conexion.query( 'SELECT * FROM users where user_email=?',[user_email], (error, results) =>{
                if(results[0]){
                    console.log('Email existe'+ results[0])
                    res.render('register',{alert:true})
                } else {

                    // Usa la conexión
                    conexion.query( 'INSERT INTO users set ?', {user_email:user_email, user_name:user_name, user_pwd:passHash}, (error, results) =>{

                        if(error){
                            throw error
                        }else{
                            res.redirect('home')
                            
                        }

                    })
                   
    
                }
            });   

            
        //})



        
    } catch (error) {
        console.error(error)
    }
}


exports.login = async (req, res)=>{
    try {
        const email = req.body.user_email
        const pass = req.body.user_pwd        
        if(!email || !pass ){
            res.render('index',{
                alert:true,
                alertTitle: "Warning",
                alertMessage: "Ingrese su email y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: ''
            })
        }else{
            conexion.query('SELECT * FROM users WHERE user_email = ?', [email], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].user_pwd)) ){
                    res.render('index', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Email o Password invalido",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: ''    
                    })
                }else{
                    //login OK
                    const id = results[0].user_id
                    const user_type = results[0].user_type
                    const user_name = results[0].user_name

                    req.session.user_name = user_name;
                    req.session.user_type = user_type;
                    req.session.user_id = id;
                    
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_EXPIRATION_TIME
                    })
                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)

                    /*conexion.query( 'SELECT * FROM users', function(error, rows) {
                        if(error){
                            throw error
                        }else{
                            res.render('home', {rows:rows})
                            console.log('BD CONECTADA')
                        }
                        // Y listo con la conexión.
                        //conexion.release();
                        
                        // No use la conexión aquí, se ha devuelto al grupo.
                    });  */

                    console.log("Cookies :  ", req.cookies);    
                    res.redirect('home')
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}


//procedure to authenticate
exports.isAuthenticated = async (req, res, next)=>{
    //if(req.session.user_id){
        if (req.cookies.jwt ) {
            try {
                
            
                const decodificada = await promisify( jwt.verify )(req.cookies.jwt, process.env.JWT_SECRETO)
                conexion.query('SELECT * FROM users WHERE user_id = ?', [decodificada.id], (error, results)=>{
                    if(!results){return next()}

                    req.name = results[0]
                    req.mi_user_type = results[0].user_type
                    req.mi_user_name = results[0].user_name
                    req.mi_user_id = results[0].user_id
                    console.log('este dato es: '+req.mi_user_id)
                    //res.send(req.mi_user_type)
                    return next()
                })
            } catch (error) {
                console.log(error)
                return next()
            }
        }else{
            res.redirect('/')        
        }
    //}else{
   //    console.log('No hay sesion activa')
    //    res.redirect('logout')        
   //}    
} 

//procedure to logout
exports.logout = (req, res) => {
    res.clearCookie('jwt')   
    return res.redirect('/')
}