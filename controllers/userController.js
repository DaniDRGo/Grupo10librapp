const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const db = require('../db/models');


// LLamado a el archivo JSON
// const dbusers = path.join(__dirname, "../Database/dbusers.json");
// const users = JSON.parse(fs.readFileSync(dbusers, "utf-8"));

const userController = {
  getAll: (req, res) => {
    db.Usuario.findAll()
      .then(users => res.render("users/users", { users }))
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
    // let userToEdit = users.find((user) => user.id == req.params.id);
    // res.render("users/editUser", { userToEdit });
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
    /*let idBuscado = req.params.id;
    let userUpdatedList = users.filter((user) => user.id != idBuscado);
    fs.writeFileSync("./Database/dbusers.json",JSON.stringify(userUpdatedList), { encoding: "utf-8" });

    res.redirect("/users");*/
    db.Usuario.destroy({
      where : {id_usuario : req.params.id}
    });
    res.redirect("/users")
  },
  showLogin: (req, res) => {
    let userData = req.cookies.user;
    if(userData){
      res.render('users/login', { userData })
    }

    res.render('users/login')
  },
  processLogin: (req, res) =>{
    console.log(req.body);
    let {email, password, recordarDatos} = req.body

    if(recordarDatos){
      res.cookie('user', email)
    }

    let userToLogIn = users.find( user =>  user.email == email)

    if(!userToLogIn){
      req.session.message = 'Usuario no Existe en BBDD'
      res.render('users/login', { message: req.session.message})
    }

    let comparePassword = bcrypt.compareSync(password,userToLogIn.password)

    if(comparePassword){
      req.session.user = {
        id: userToLogIn.id,
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

module.exports = userController;
