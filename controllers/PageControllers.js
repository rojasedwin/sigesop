
const vistaPrincipal = (req, res)=>{
   console.log('Desde el home el rol es: '+req.session.my_rol)
   const rol_user=req.session.my_rol
    res.render('home',{rol_user})
}

const vistaUsuarios = (req, res)=>{
    console.log('Desde Usuario el rol es: '+req.session.my_rol)
    const rol_user=req.session.my_rol
    res.render('usuarios',{rol_user})
}

module.exports ={
    vistaPrincipal,
    vistaUsuarios
}