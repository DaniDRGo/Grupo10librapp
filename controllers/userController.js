const fs = require("fs");
const path = require("path");
const multer = require("multer");

// LLamado a el archivo JSON
const dbusers = path.join(__dirname, "../Database/dbusers.json");
const users = JSON.parse(fs.readFileSync(dbusers, "utf-8"));

const userController = {
  getAll: (req, res) => {
    res.render("users/users", { users });		
  },
  getOne: (req, res) => {
    let id = req.params.id;
    let usuarioBuscado = users.find((user) => user.id == id);
    res.render("users/userDetail", { usuarioBuscado });
  },
  showForm: (req, res) => {
    res.render("users/register");
  },
  createUser: (req, res) => {
    let idDefinition = users.length + 1;
    console.log(req.file)
    let {
      nombre,
      apellido,
      avatar,
      fecha,
      email,
      phone,
      pais,
      provincia,
      localidad,
      direccion,
      piso,
			cp,
			password
    } = req.body;

    let newUser = {
      id : idDefinition,
      nombre,
      apellido,
      avatar,
      fecha,
      email,
      phone,
      pais,
      provincia,
      localidad,
      direccion,
      piso,
			cp,
			password
    };

    //Asignación del nombre de la imagen para poder guardarla en BBDD
    newUser.avatar =  req.file.filename;

		console.log(newUser)

    users.unshift(newUser);
    let usersReady = JSON.stringify(users)
    fs.writeFileSync('./Database/dbusers.json', usersReady)

    // console.log(productsReady)
    res.redirect("/users");
  },
  // showFormEdit: (req, res) => {

  //   let itemToEdit = products.find( product => product.id == req.params.id );

  //   let allCategories = [];
  //   let allFormatos = [];
  //   // Recorro todo el array para obtener solo la categoría
  //   products.map((product) => {
  //     allCategories.push(product.categoria);
  //   });
  //   // Recorro todo el array para obtener solo el formato
  //   products.map((product) => {
  //     allFormatos.push(product.formato);
  //   });
  //   // Con SET quito los duplicado del Array
  //   let categorias = [...new Set(allCategories)];
  //   let formatos = [...new Set(allFormatos)];
  //   //Ordeno el array
  //   categorias = categorias.sort();
  //   formatos = formatos.sort();

  //   res.render("editProduct", { categorias, formatos, itemToEdit });
  // },
  // editBook: (req, res) => {

  //   const idBuscado = req.params.id

  //   let productModification = {
  //     titulo,
  //     autor,
  //     portada,
  //     descripcion,
  //     isbn,
  //     categoria,
  //     numero_paginas,
  //     formato,
  //     precio,
  //     peso,
  //     idioma,
  //   } = req.body;

  //   let updatedBook = {
  //     id : idBuscado,
  //     ...productModification
  //   };

  //   for (const i in products) {
  //     if (products[i].id == idBuscado)  {
  //       products[i] = updatedBook;
  //       break;
  //     }
  //   }

  //   fs.writeFileSync('./Database/dbproducts.json', JSON.stringify(products), {encoding: 'utf-8'})

  //   res.redirect("/products");
  // },
  // destroyProduct: (req, res) => {

  //   let idBuscado = req.params.id;

  //   let productUpdatedList = products.filter( product => product.id != idBuscado );

  //   fs.writeFileSync('./Database/dbproducts.json', JSON.stringify(productUpdatedList), {encoding: 'utf-8'});

  //   res.redirect('/products');

  // }
};

module.exports = userController;
