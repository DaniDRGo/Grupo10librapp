const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const db = require('../db/models');


// LLamado a el archivo JSON
const dbusers = path.join(__dirname, "../Database/dbusers.json");
const users = JSON.parse(fs.readFileSync(dbusers, "utf-8"));

const userController = {
  getAll: (req, res) => {
    db.Usuario.findAll()
      .then(users => res.json( users ))
    // res.render("users/users", { users });
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
    db.Usuario.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      avatar: 'http://placeimg.com/480/640/any',
      fecha_nacimiento: req.body.fecha,
      email: req.body.email,
      telefono: req.body.phone,
      pais: req.body.pais,
      provincia: req.body.provincia,
      localidad: req.body.localidad,
      direccion: req.body.direccion,
      piso: req.body.piso,
      cod_postal: req.body.cp,
      password: req.body.password,
      tyc: req.body.tc,
      id_rol: 2 
    })
    // let idDefinition = users.length + 1;
    // console.log(req.file);
    // let {
    //   nombre,
    //   apellido,
    //   avatar,
    //   fecha,
    //   email,
    //   phone,
    //   pais,
    //   provincia,
    //   localidad,
    //   direccion,
    //   piso,
    //   cp,
    //   password,
    //   tc,
    // } = req.body;

    // password = bcrypt.hashSync(password, 10);

    // let newUser = {
    //   id: idDefinition,
    //   nombre,
    //   apellido,
    //   avatar,
    //   fecha,
    //   email,
    //   phone,
    //   pais,
    //   provincia,
    //   localidad,
    //   direccion,
    //   piso,
    //   cp,
    //   password,
    //   TYC: tc,
    //   isAdmin: false,
    // };

    // //Asignación del nombre de la imagen para poder guardarla en BBDD
    // newUser.avatar = req.file.filename;
    // // Captura la inforacion edl radio button , para hacer validaciones posteriores
    // newUser.TYC = newUser.TYC ? true : false;

    // users.unshift(newUser);
    // let usersReady = JSON.stringify(users);
    // fs.writeFileSync("./Database/dbusers.json", usersReady);
    // res.redirect("/users");
  },
  showFormEdit: (req, res) => {
    let userToEdit = users.find((user) => user.id == req.params.id);
    res.render("users/editUser", { userToEdit });
  },
  editUser: (req, res) => {
    const idBuscado = req.params.id;

    let userModification = ({
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
      isAdmin,
    } = req.body);

    let updatedUser = {
      id: idBuscado,
      ...userModification,
    };

    for (const i in users) {
      if (users[i].id == idBuscado) {
        users[i] = updatedUser;
        break;
      }
    }

    fs.writeFileSync("./Database/dbusers.json", JSON.stringify(users), {encoding: "utf-8"});

    res.redirect("/users");
  },
  destroyUser: (req, res) => {
    let idBuscado = req.params.id;
    let userUpdatedList = users.filter((user) => user.id != idBuscado);
    fs.writeFileSync("./Database/dbusers.json",JSON.stringify(userUpdatedList), { encoding: "utf-8" });

    res.redirect("/users");
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
