var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/userController')


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
router.get('/', userController.getAll );
// Renderiza el detalle de un producto
router.get('/detalle/:id', userController.getOne);
// Renderiza el formulario para crear un usuario
router.get('/create', userController.showForm);
// Crea un Producto a partir del formulario cargado
router.post('/create', upload.single('avatar') ,userController.createUser);
// Editar Producto
router.get('/edit/:id', userController.showFormEdit);
router.put('/edit/:id', userController.editUser);
// Eliminar Producto
router.delete('/delete/:id', userController.destroyUser);
// LOGIN de Usuario
router.get('/login', userController.showLogin)
router.post('/login', userController.processLogin)


module.exports = router;
