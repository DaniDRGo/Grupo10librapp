var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const userControllerApi = require('../controllers/api/userControllerApi');

const loggedInValidator = require('../middlewares/loggedInMiddleware');
const authValidator = require('../middlewares/authMiddleware');


// Implementación para la carga de una imagen (Avatar)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/userImages'))
  },
  filename: function (req, file, cb) {
    cb(null, 'user-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })



// RUTAS

// Renderiza todos los usuarios
router.get('/users',/*authValidator,*/ userControllerApi.getAll );
// // Renderiza el detalle de un producto
// router.get('/detalle/:id', userControllerApi.getOne);
// // Renderiza el formulario para crear un usuario
// router.get('/create', /*loggedInValidator,*/ userControllerApi.showForm);
// // Crea un Producto a partir del formulario cargado
// router.post('/create', upload.single('avatar') ,userControllerApi.createUser);
// // Editar Producto
// router.get('/edit/:id', userControllerApi.showFormEdit);
// router.put('/edit/:id', userControllerApi.editUser);
// // Eliminar Producto
// router.delete('/delete/:id', userControllerApi.destroyUser);
// // LOGIN de Usuario
// router.get('/login', loggedInValidator, userControllerApi.showLogin)
// router.post('/login', userControllerApi.processLogin)
// //logOut
// router.get('/logout', userControllerApi.logout)


module.exports = router;
