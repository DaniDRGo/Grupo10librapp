const bcrypt = require("bcrypt");

const sequelize = require("../handlers/sequelize");

const userController = {
  getAll: (req, res) => {
    sequelize
      .findAll("Usuario", {
        attributes: ["id_usuario", "nombre", "apellido", "id_rol"],
      })
      .then((users) => {
        res.render("users/users", { users });
      });
  },
  getOne: (req, res) => {
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
        where: {
          id_usuario: req.params.id,
        },
      })
      .then((user) => {
        res.render("users/userDetail", { usuarioBuscado: user[0] });
      });
  },
  showForm: (req, res) => {
    res.render("users/register");
  },
  createUser: (req, res) => {
   
    let avatar = req.file.filename
    let password = req.body.password
    password = bcrypt.hashSync(password, 10);   
    let tyc = req.body.tc ? true : false;

    sequelize.create("Usuario", {
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
      id_rol: 2, // este dato solo se cambia desde BBDD , hay que hacer una función para poderlo editar desde la app
    });
    res.redirect("/users");
  },
  showFormEdit: (req, res) => {
    sequelize.findAll('Usuario', {
      attributes: [
        "id_usuario",
        "nombre",
        "apellido",
        "fecha_nacimiento",
        "email",
        "telefono",
        "pais",
        "provincia",
        "localidad",
        "direccion",
        "piso",
        "cod_postal"
      ],
      where: {
        id_usuario: req.params.id
      }
    })
    .then( user => {
      res.render("users/editUser", { userToEdit: user[0] })
    } )
  },
  editUser: (req, res) => {
    sequelize.update(
      "Usuario",
      {
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
        cod_postal: req.body.cp,
      },
      {
        where: {
          id_usuario: req.params.id,
        },
      }
    );
    res.redirect("/users");
  },
  destroyUser: (req, res) => {
    sequelize.destroy('Usuario',{
      where: {
        id_usuario: req.params.id,
      },
    });

    res.redirect("/users");
    },
  showLogin: (req, res) => {
    let userData = req.cookies.user;
    if (userData) {
      res.render("users/login", { userData });
    }

    res.render("users/login");
  },
  processLogin: async (req, res) => {

    let { email, password, recordarDatos } = req.body;

    if (recordarDatos) {
      res.cookie("user", email);
    }

    let userToLogIn = await sequelize.findAll("Usuario", {
      where: {
        email: req.body.email,
      },
    });


    if (!userToLogIn[0]) {
      req.session.message = "Usuario no Existe en BBDD" ;
      console.log('Usuario no existe en BBD')
      res.render("users/login", { message: req.session.message });
    }

    try {
      let comparePassword = bcrypt.compareSync(password, userToLogIn[0].password);      
      if (comparePassword) {
        req.session.user = {
          id: userToLogIn[0].id_usuario,
          email: userToLogIn[0].email,
        }; //Tomar estos datos y pintarlos en el Index
        req.session.message = "usuario logueado";
        res.redirect("/");
      } else {
        req.session.message = "email o password inválido";
        res.render("users/login", {
          userEmail: email,
          message: req.session.message,
        });
      }
    } catch (error) {
      console.log(error)
    }

  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("login");
  },
};

module.exports = userController;
