const fs = require("fs");
const path = require("path");

const multer = require('multer');
const { validationResult } = require('express-validator')

// LLamado a el archivo JSON
const dbproducts = path.join(__dirname, "../Database/dbproducts.json");
const products = JSON.parse(fs.readFileSync(dbproducts, "utf-8"));

// Base de Datos
const db = require('../db/models')



const productController = {
  getAll: (req, res) => {    
    db.Libro.findAll()
    .then(libros => res.render("products/products", { products: libros }))
  },
  getOne: (req, res) => {
    db.Libro.findByPk(req.params.id)
    .then( libro => { res.render("products/productDetail", { productoBuscado: libro }) } )
  },
  showForm: async (req, res) => {   
    const categorias = await db.Categoria.findAll()
    res.render("products/createProduct", { categorias })
  },  
  createBook: async (req, res) => {
    let errors = validationResult(req);
    const categorias = await db.Categoria.findAll()
    if(errors.isEmpty()){
      db.Libro.create({
        titulo: req.body.titulo,
        autor: req.body.autor,
        portada:  req.body.portada,
        descripcion: req.body.descripcion,
        isbn: req.body.isbn,
        num_paginas: req.body.numero_paginas,
        precio: req.body.precio,
        peso: req.body.peso,
        idioma: req.body.idioma,
        id_categoria_libro: req.body.categoria
      });
      res.redirect("/products");
    }else{
      res.render('products/createProduct', { errors: errors.mapped(), old: req.body, categorias })
    }
  },
  showFormEdit: async (req, res) => {
  const categorias = await db.Categoria.findAll()

  const idLibro = await db.Libro.findByPk(req.params.id)
  const categoriaLibro = await db.Categoria.findAll({
    where: {
      id_categoria_libro: idLibro.id_categoria_libro
    }
  })

  db.Libro.findByPk(req.params.id)
    .then( book => res.render("products/editProduct", { itemToEdit: book, categorias, categoriaLibro: categoriaLibro[0] }) )


  },
  editBook: (req, res) => {

    db.Libro.update({
      titulo: req.body.titulo,
      autor: req.body.autor,
      descripcion: req.body.descripcion,
      isbn: req.body.isbn,
      num_paginas: req.body.numero_paginas,
      precio: req.body.precio,
      peso: req.body.peso,
      idioma: req.body.idioma,
      id_categoria_libro: req.body.categoria
    },{
      where: {
        id_libro: req.params.id
      }
    });


    res.redirect("/products");
  },
  destroyProduct: (req, res) => {

    db.Libro.destroy({
      where: {
        id_libro: req.params.id 
      }
    });

    res.redirect("/products"); 


  }
};

module.exports = productController;
