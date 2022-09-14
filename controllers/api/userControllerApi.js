const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const db = require('../../db/models');



const userControllerApi = {
  getAll: (req, res) => {
    db.Usuario.findAll()
      .then(users => res.json(users))
  },
  getOne: (req, res) => {
    db.Usuario.findByPk(req.params.id)
      .then( user => { res.render("users/userDetail", { usuarioBuscado: user }) } )
  },
  showForm: (req, res) => {
    res.render("users/register");
  },
  createUser: (req, res) => {

    let avatar = req.file.filename
    let password = req.body.password
    password = bcrypt.hashSync(password, 10);
    let tyc = req.body.tc ? true : false;

    db.Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      avatar,
      fecha_nacimiento: req.body.fecha,
      email: req.body.email,
      telefono: req.body.phone,
      pais: req.body.pais,
      provincia: req.body.provincia,
      localidad: req.body.localidad,
      direccion: req.body.direccion,
      piso: req.body.piso,
      cod_postal: req.body.cp,
      password,
      tyc,
      id_rol: 2 // este dato solo se cambia desde BBDD , hay que hacer una función para poderlo editar desde la app
    });
    res.redirect("/users");
  },
  showFormEdit: (req, res) => {
    db.Usuario.findByPk(req.params.id)
      .then( user => res.render("users/editUser", { userToEdit: user }) )
  },
  editUser: (req, res) => {
        
    db.Usuario.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      fecha_nacimiento: req.body.fecha,
      email: req.body.email,
      telefono: req.body.phone,
      pais: req.body.pais,
      provincia: req.body.provincia,
      localidad: req.body.localidad,
      direccion: req.body.direccion,
      piso: req.body.piso,
      cod_postal: req.body.cp
    },{
      where: {
        id_usuario: req.params.id
      }
    });
    res.redirect("/users");
  },
  destroyUser: (req, res) => {
    db.Usuario.destroy({
      where: {
        id_usuario: req.params.id 
      }
    });

    res.redirect("/users");
  },
  showLogin: (req, res) => {
    let userData = req.cookies.user;
    if(userData){
      res.render('users/login', { userData })
    }

    res.render('users/login')
  },
  processLogin: async (req, res) =>{
    console.log(req.body);
    let {email, password, recordarDatos} = req.body

    if(recordarDatos){
      res.cookie('user', email)
    }

    let userToLogIn = await db.Usuario.findOne({
      where : {
        email: req.body.email
      }
    });

    console.log(userToLogIn) // Borrar al finalizar todo

    if(!userToLogIn){
      req.session.message = 'Usuario no Existe en BBDD'
      res.render('users/login', { message: req.session.message})
    }

    let comparePassword = bcrypt.compareSync(password,userToLogIn.password)

    if(comparePassword){
      req.session.user = {
        id: userToLogIn.id_usuario,
        email: userToLogIn.email
      } //Tomar estos datos y pintarlos en el Index
    req.session.message =  'usuario logueado' ;
    res.redirect('/')
    }else{
      req.session.message =  'email o password inválido' 
      res.render('users/login', { userEmail: email , message: req.session.message})
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect('login')
  }
};

module.exports = userControllerApi;
