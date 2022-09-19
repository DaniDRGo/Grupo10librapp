var express = require('express');
var router = express.Router();

const apiController = require('../../controllers/api/apiController');


// RUTAS

// Renderiza todos los usuarios
router.get('/users', apiController.getAllUsers );
// // Renderiza el detalle de un Usuario
router.get('/users/detalle/:id', apiController.getOneUser);

// Renderiza todos los Libros
router.get('/books', apiController.getAllBooks );
// // Renderiza el detalle de un Libro
router.get('/books/detalle/:id', apiController.getOneBook);

module.exports = router;
