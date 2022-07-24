const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify}= require('util')

//register user

exports.registeruser = async (req, res) =>{
const user_email= req.body.user_email
const user_name= req.body.user_name
const user_pwd= req.body.user_pwd
console.log(user_email +" - "+user_name+" - "+user_pwd)
}