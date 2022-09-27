const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const sequelize = require("../handlers/sequelize");

/* GET home page. */

// pendiente hacer CRUD de Libros

router.get("/:id?", async (req, res) => {
  // console.log(req.params)
  const user = req.session.user;

  let categoriasCompletas = await sequelize.findAll("Categoria", {
    attributes: ["id_categoria_libro", "nombre_categoria_libro"],
  });

  let libros = await fetch(
    "https://fakerapi.it/api/v1/books?_quantity=20"
  ).then((response) => response.json()); // Se usará para info de la card
  
  let images = await fetch(
    "https://api.unsplash.com/photos/random/?client_id=rA9KqTGdsd5kBu7Z4za_GHlhSo_gybKzDmNb5V0r3d4&count=20&orientation=portrait&w=1500&dpr=2"
  ).then((response) => response.json());
  
  let librosCompletos = await sequelize.findAll("Libro", {
    attributes: [
      "id_libro",
      "titulo",
      "autor",
      "portada",
      "descripcion",
      "isbn",
      "num_paginas",
      "precio",
      "peso",
      "idioma",
      "id_categoria_libro"
    ],
  });

  if(req.params.id){
    librosCompletos = librosCompletos.filter( libros => {
      return libros.id_categoria_libro == req.params.id
    } )
  }



  res.render("index", {
    user,
    apiBooks: libros.data,
    apiImages: images,
    categorias: categoriasCompletas,
    librosOk: librosCompletos,
  });
});

module.exports = router;
