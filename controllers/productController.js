const sequelize = require("../handlers/sequelize");

const { validationResult } = require('express-validator')

const productController = {
  getAll: (req, res) => {
    sequelize.findAll("Libro", { attributes: [ 'id_libro', 'titulo'] }).then((libros) => {
      res.render("products/products", { products: libros });
    });
  },
  getOne: (req, res) => {
    sequelize.findAll("Libro", {
        include: [
          {
            model: "Categoria",
          },
        ],
        where: {
          id_libro: req.params.id
        }
      })
      .then((libro) => {
        res.render("products/productDetail", { productoBuscado: libro[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  showForm: async (req, res) => {
    const categorias = await sequelize.findAll("Categoria", {attributes: [ 'id_categoria_libro', 'nombre_categoria_libro'] });
    res.render("products/createProduct", { categorias });
  },
  createBook: async (req, res) => {
    let errors = validationResult(req);
    const categorias = await sequelize.findAll("Categoria", {attributes: [ 'id_categoria_libro', 'nombre_categoria_libro'] });
    if (errors.isEmpty()) {
      sequelize.create("Libro", {
        titulo: req.body.titulo,
        autor: req.body.autor,
        portada: req.body.portada,
        descripcion: req.body.descripcion,
        isbn: req.body.isbn,
        num_paginas: req.body.numero_paginas,
        precio: req.body.precio,
        peso: req.body.peso,
        idioma: req.body.idioma,
        id_categoria_libro: req.body.categoria,
      });
      res.redirect("/products");
    } else {
      res.render("products/createProduct", {
        errors: errors.mapped(),
        old: req.body,
        categorias,
      });
    }
  },
  showFormEdit: async (req, res) => {
    const categorias = await sequelize.findAll("Categoria", {attributes: [ 'id_categoria_libro', 'nombre_categoria_libro'] });

    sequelize.findAll("Libro", {
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
      ] ,
      where: {
        id_libro: req.params.id,
      },
      include: [{ model: "Categoria" }],
    })
    .then( libro => {
      res.render("products/editProduct", {
            itemToEdit: libro[0],
            categorias,
            categoriaLibro: libro[0].Categorium,
          })
    } )
  },
  editBook: (req, res) => {
    sequelize.update(
      "Libro",
      {
        titulo: req.body.titulo,
        autor: req.body.autor,
        descripcion: req.body.descripcion,
        isbn: req.body.isbn,
        num_paginas: req.body.numero_paginas,
        precio: req.body.precio,
        peso: req.body.peso,
        idioma: req.body.idioma,
        id_categoria_libro: req.body.categoria,
      },
      {
        where: {
          id_libro: req.params.id,
        },
      }
    );

    res.redirect("/products");
  },
  destroyProduct: (req, res) => {
    sequelize.destroy('Libro',{
      where: {
        id_libro: req.params.id,
      },
    })
    res.redirect("/products");
  },
};

module.exports = productController;


