const sequelize = require("../../handlers/sequelize");

const apiController = {
  getAllUsers: (req, res) => {
    try {
      // db.Usuario.findAll().then((users) =>
      //   res.status(200).json({
      //       count: users.length,
      //       method: "GET",
      //       url: "/api/users",
      //       users: users
      //   })
      // );
      sequelize.findAll('Usuario',{
        attributes: ['id_usuario', 'nombre', 'apellido']
      })
      .then( users => {
        res.status(200).json(users)
      } )
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }



  },
  getOneUser: (req, res) => {
    try {
      db.Usuario.findByPk(req.params.id)
        .then((user) =>
          res.status(200).json({
              method: "GET",
              url: "/api/users/detalle/:id",
              user
          })
        )
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }
  },
  getAllBooks: (req, res) => {
    try {
      sequelize.findAll('Libro', {
        attributes: [ 'id_libro', 'titulo', 'descripcion' ],
        include: [ {model:'Categoria', attributes: ['nombre_categoria_libro']} ]
      })
      .then( libros => {
        const librosUpdated = libros.map(libro => {
          newLibro = {
            id : libro.id_libro,
            name: libro.titulo,
            description: libro.descripcion,
            categoria: libro.Categorium.nombre_categoria_libro,
            url: `/api/books/detalle/${libro.id_libro}`,
          }
          return newLibro
        } )
        res.status(200).json(
          {
            count: libros.length,
            products: librosUpdated
          }
        )
      } )
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }
  },
  getOneBook: (req, res) => {
    try {
      sequelize.findAll('Libro',{
        attributes: [ 'id_libro', 'titulo', 'autor', 'portada', 'descripcion', 'isbn', 'num_paginas', 'precio', 'peso', 'idioma' ],
        include: [ {model:'Categoria', attributes: ['nombre_categoria_libro']} ],
        where:{ id_libro: req.params.id  },
      })
      .then( libro => {
        res.status(200).json( libro)
      } )
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }
  },
  getAllCategories: (req, res) => {
    try {
      sequelize.findAll('Categoria', {
        attributes: [ 'id_categoria_libro', 'nombre_categoria_libro' ],
        include: [ { model: 'Libro' , attributes: [ 'titulo' ]}]
      })
      .then( categorias => {
        counter = categorias.map( categoria => {
          infoCounter = {
            id: categoria.id_categoria_libro,
            nombre: categoria.nombre_categoria_libro,
            TotalLibros: categoria.Libros.length,
            Libros: categoria.Libros
          }
          return infoCounter
        } )
        res.status(200).json({ data: counter})
      } )
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }
  }, 
};

module.exports = apiController;
