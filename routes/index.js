const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const db = require('../db/models');

/* GET home page. */

// pendiente hacer CRUD de Libros

router.get('/:id?', async (req, res)=>{
    // console.log(req.params)
    const user = req.session.user

    let categoriasCompletas = await   db.Categoria.findAll();

    let libros = await fetch('https://fakerapi.it/api/v1/books?_quantity=20').then(response =>  response.json() );  // Se usará para info de la card
    let images = await fetch('https://api.unsplash.com/photos/random/?client_id=rA9KqTGdsd5kBu7Z4za_GHlhSo_gybKzDmNb5V0r3d4&count=20&orientation=portrait&w=1500&dpr=2').then(response =>  response.json() );
    let librosCompletos = await db.Libro.findAll();
    if(req.params.id){
      librosCompletos = librosCompletos.filter( libro => libro.id_categoria_libro == req.params.id )
    }
    // console.log( librosCompletos )
    res.render('index', { 
      user,
      apiBooks: libros.data,
      apiImages: images,
      categorias: categoriasCompletas,
      librosOk: librosCompletos
  });  

});



module.exports = router;
