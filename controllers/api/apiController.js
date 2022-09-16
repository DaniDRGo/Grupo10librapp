const db = require("../../db/models");

const apiController = {
  getAllUsers: (req, res) => {
    try {
      db.Usuario.findAll().then((users) =>
        res.status(200).json({
            count: users.length,
            method: "GET",
            url: "/api/users",
            users: users
        })
      );
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
      db.Libro.findAll().then((books) =>
        res.status(200).json({
            count: books.length,
            method: "GET",
            url: "/api/books",
            books
        })
      );
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }
  },
  getOneBook: (req, res) => {
    try {
      db.Libro.findByPk(req.params.id)
        .then((book) =>
          res.status(200).json({
              method: "GET",
              url: "/api/books/detalle/:id",
              book
          })
        )
    } catch (error) {
      res.status(500).json({
          error: "No se pudo realizar la petición"
      });
    }
  },
  
};

module.exports = apiController;
