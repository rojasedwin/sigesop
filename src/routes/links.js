const express = require('express');
const router = express.Router();
const faker = require('faker');

//conexion a la base de datos
const pool = require ('../database');

const { isLoggedIn } = require('../lib/auth');

//ruta cuando se coloque parametro de add
router.get('/add', isLoggedIn,(req, res) => {
    res.render('links/add');
});

//--RECIBIR DATOS DEDE FORMULARIO
router.post('/add', isLoggedIn, async(req, res) => {
    //le digo a JS los input que me interesa guardar
    const { title,url, description } = req.body;
    //lo guArdo dentro de un nuevo objeto
   
    const newLink = {
        title,
        url,
        description,
        //variable de sesion
        user_id: (req.user.id)

    };
    //--MOSTRAR DATOS POST ENVIADOS POR CONSOLA
    //console.log(req.body);
    //console.log(newLink);

    //--GUARDO EN MYSQL
    await pool.query('INSERT INTO links set ?', [newLink]);
    
    //muestro mensaje al usuario
    //parametros=nombre del mensaje y mensaje a mostrar
    req.flash('success_msg','Registro Guardado Correctamente');
    

    //nmuestro mensaje en pantalla temporal para verificar que s envia formulario
    //res.send('recibido');
    res.redirect('/links');
});


// to generate fake data
router.post('/add_fake', async(req, res, next) => {
    for(let i = 0; i < 90; i++) {
    const url=faker.internet.url();
    const title=faker.commerce.department();
    const description=faker.commerce.productName();
    const user_id=faker.random.number();
    const created_at= faker.date.between('2015-01-01', '2020-12-31');
    
        const newLink = {
            title,
            url,
            description,
            user_id ,
            created_at   
        };
        await pool.query('INSERT INTO links set ?', [newLink]);
     
    }
    res.redirect('/links');
   
  });



//--MOSTRAR EN PANTALLA LO QUE GUARDO DESDE FORMULARIO ADD
router.get('/', isLoggedIn, async(req, res) => {
    //consulto todos los links
    //const links = await pool.query('SELECT * FROM links');
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
    //console.log(links);
    //res.send('AQUI VAN LISTAS');
    //RENDERIZO
    res.render('links/list', { links });
});

//--ELIMINAR ITEM
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success_msg','Registro Eliminado Correctamente');
    //muestro en consola el id eliminado
    //console.log(req.params.id);
    //res.send('ELIMINADO');
    //REDIRECCIONO
    res.redirect('/links');
});


//--EDITAR ITEMS Y MOSTRAR EN FORMULARIO
router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    //muestro en consola el id eliminado
    //console.log(req.params.id);
    //res.send('ACTUALIZANDO');
    //REDIRECCIONO
    //console.log(links[0]);
    res.render('links/edit', { link: links[0] });
});

//ACTUALIZAR REGISTRO A EDITAR
router.post('/edit/:id', isLoggedIn, async(req, res) =>{
    const { id } = req.params;
    const { title, description, url } =req.body;
    const newLink = {
        title,
        description,
        url
    };
    //console.log(newLink);
    //res.send('ACTUALIZADO');
    await pool.query('UPDATE links set ? WHERE id = ?',[newLink, id]);
    req.flash('success_msg','Registro Actualizado Correctamente');
    res.redirect('/links');

});

router.get('/products/:page',async (req,res,next)=>{
    let perPage=9;
    let page=req.params.page || 1;
    let ski=(perPage*page)-perPage;
    const links = await pool.query('SELECT * FROM links ');
    res.render('links/listado', { links });

});

module.exports = router;