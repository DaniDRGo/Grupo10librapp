const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require('bcrypt')

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
			password,
			tc
    } = req.body;

		password = bcrypt.hashSync(password,10)

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
			password,
			TYC: tc,
			isAdmin: false
    };

    //Asignación del nombre de la imagen para poder guardarla en BBDD
    newUser.avatar =  req.file.filename;
		// Captura la inforacion edl radio button , para hacer validaciones posteriores
		newUser.TYC = newUser.TYC ? true : false ;

		users.unshift(newUser);
		let usersReady = JSON.stringify(users)
		fs.writeFileSync('./Database/dbusers.json', usersReady);
		res.redirect("/users");

  
  },
  showFormEdit: (req, res) => {
    let userToEdit = users.find( user => user.id == req.params.id );
    res.render("users/editUser", { userToEdit });
  },
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
