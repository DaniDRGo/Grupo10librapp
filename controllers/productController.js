const sequelize = require("../handlers/sequelize");

const productController = {
  getAll: (req, res) => {
    sequelize.findAll("Libro", { attributes: [ 'id_libro' ] }).then((libros) => {
      res.render("products/products", { products: libros });
    });
  },
  getOne: (req, res) => {
    sequelize
      .findAll("libro", {
        include: [
          {
            model: "Categoria",
          },
        ],
      })
      .then((libros) => {
        res.json(libros);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  showForm: async (req, res) => {
    const categorias = await sequelize.findAll("Categoria");
    res.render("products/createProduct", { categorias });
  },
  createBook: async (req, res) => {
    let errors = validationResult(req);
    const categorias = await sequelize.findAll("Categoria");
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
    const categorias = await sequelize.findAll("Categoria");

    // const idLibro = await db.Libro.findByPk(req.params.id);

    // const categoriaLibro = await db.Categoria.findAll({
    //   where: {
    //     id_categoria_libro: idLibro.id_categoria_libro,
    //   },
    // });
    // db.Libro.findByPk(req.params.id).then((book) =>
    //   res.render("products/editProduct", {
    //     itemToEdit: book,
    //     categorias,
    //     categoriaLibro: categoriaLibro[0],
    //   })
    // );

    sequelize.findAll("Libro", {
      where: {
        id_libro: req.param.id,
      },
      include: [{ model: "Categoria" }],
    })
    .then( libro => {
      res.render("products/editProduct", {
            itemToEdit: libro,
            categorias,
            // categoriaLibro: categoriaLibro[0],
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


