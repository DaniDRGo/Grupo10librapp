const sequelize = require("../../handlers/sequelize");
const path = require("path");

const apiController = {
  getAllUsers: (req, res) => {
    try {
      sequelize
        .findAll("Usuario", {
          attributes: ["id_usuario", "nombre", "apellido", "email"],
        })
        .then((users) => {
          let infoUsers = users.map((user) => {
            newUser = {
              id: user.id_usuario,
              name: `${user.nombre + " " + user.apellido}`,
              email: user.email,
              detail: `/api/users/detalle/${user.id_usuario}`,
            };
            return newUser;
          });
          res.status(200).json({
            count: users.length,
            users: infoUsers,
          });
        });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo realizar la petición",
      });
    }
  },
  getOneUser: (req, res) => {
    try {
      sequelize
        .findAll("Usuario", {
          attributes: [
            "nombre",
            "apellido",
            "avatar",
            "fecha_nacimiento",
            "email",
            "telefono",
            "pais",
            "provincia",
            "localidad",
            "direccion",
            "piso",
            "cod_postal",
            "password",
            "tyc",
            "id_rol",
          ],
          // include: [ {model:'Rol', attributes: ['nombre_rol']} ],
          where: { id_usuario: req.params.id },
        })
        .then((user) => {
          let infoUser = user.map( u =>{
            let newUser = {
              nombre: u.nombre,
              apellido: u.apellido,
              url_avatar: `C:/Users/samsung/Desktop/librapp/public/img/userImages/${u.avatar}`,
              // avatar: path.join(__dirname, `${u.avatar}`) ,
              fecha_nacimiento: u.fecha_nacimiento,
              email: u.email,
              telefono: u.telefono,
              pais: u.pais,
              provincia: u.provincia,
              localidad: u.localidad,
              direccion: u.direccion,
              piso: u.piso,
              cod_postal: u.cod_postal,
              tyc: u.tyc,
              id_rol: u.id_rol
            }
          return newUser  
          } )
          res.status(200).json(infoUser);
        });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo realizar la petición",
      });
    }
  },
  getAllBooks: (req, res) => {
    try {
      sequelize
        .findAll("Libro", {
          attributes: ["id_libro", "titulo", "descripcion"],
          include: [
            { model: "Categoria", attributes: ["nombre_categoria_libro"] },
          ],
        })
        .then((libros) => {
          const librosUpdated = libros.map((libro) => {
            newLibro = {
              id: libro.id_libro,
              name: libro.titulo,
              description: libro.descripcion,
              categoria: libro.Categorium.nombre_categoria_libro,
              url: `/api/books/detalle/${libro.id_libro}`,
            };
            return newLibro;
          });
          res.status(200).json({
            count: libros.length,
            products: librosUpdated,
          });
        });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo realizar la petición",
      });
    }
  },
  getOneBook: (req, res) => {
    try {
      sequelize
        .findAll("Libro", {
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
          ],
          include: [
            { model: "Categoria", attributes: ["nombre_categoria_libro"] },
          ],
          where: { id_libro: req.params.id },
        })
        .then((libro) => {
          res.status(200).json(libro);
        });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo realizar la petición",
      });
    }
  },
  getAllCategories: (req, res) => {
    try {
      sequelize
        .findAll("Categoria", {
          attributes: ["id_categoria_libro", "nombre_categoria_libro"],
          include: [{ model: "Libro", attributes: ["titulo"] }],
        })
        .then((categorias) => {
          counter = categorias.map((categoria) => {
            infoCounter = {
              id: categoria.id_categoria_libro,
              nombre: categoria.nombre_categoria_libro,
              TotalLibros: categoria.Libros.length,
              Libros: categoria.Libros,
            };
            return infoCounter;
          });
          res.status(200).json({ data: counter });
        });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo realizar la petición",
      });
    }
  },
};

module.exports = apiController;


