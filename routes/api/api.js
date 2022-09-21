var express = require('express');
var router = express.Router();
const cors = require('cors')

const apiController = require('../../controllers/api/apiController');


// RUTAS

// Renderiza todos los usuarios
router.get('/users', cors() ,apiController.getAllUsers );
// // Renderiza el detalle de un Usuario
router.get('/users/detalle/:id', cors(), apiController.getOneUser);
// Renderiza todos los Libros
router.get('/books', cors(), apiController.getAllBooks );
// // Renderiza el detalle de un Libro
router.get('/books/detalle/:id', cors(), apiController.getOneBook);

module.exports = router;
