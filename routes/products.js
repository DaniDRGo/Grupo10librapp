var express = require('express');
var router = express.Router();
const path = require('path');

const loggedInValidator = require('../middlewares/loggedInMiddleware');
const authValidator = require('../middlewares/authMiddleware');

const multer = require('multer');
const { check, body } = require('express-validator')

const productController = require('../controllers/productController')


// Middleare para subir imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/productImages'))
  },
  filename: function (req, file, cb) {
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
//

// Middleware pra hacer validaciones del formulario de Creción y Edición
const formsValidations = [
  check('titulo')
    .notEmpty()
    .withMessage('Debes completar este campo con el TITULO del Libro'),
  check('descripcion')
    .notEmpty()
    .withMessage('Debes completar este campo con la DESCRIPCIÓN del Libro'),
  check('portada')
    .custom((value, { req })=>{
      let file = req.file;
      let acceptedExtension = ['.jpg', '.png', '.gif'];
      if(!file){
        throw new Error('Debes cargar una IMAGEN DE PORTADA')
      }else{        
        let fileExtension = path.extname(file.originalname);        
        if(!acceptedExtension.includes(fileExtension)){
          throw new Error(`Debes cargar un archivo con EXTENSION válida, las cuales son: ${ acceptedExtension.join(', ') } `)
        }
      }
      return true;
    }),
  check('autor')
    .notEmpty()
    .withMessage('Debes completar este campo con el NOMBRE DEL AUTOR del Libro'),
  check('isbn')
    .notEmpty()
    .withMessage('Debes completar este campo'),
  check('numero_paginas')
    .notEmpty()
    .withMessage('Debes completar este campo'),
  check('precio')
    .notEmpty()
    .withMessage('Debes completar este campo'),
  check('peso')
    .notEmpty()
    .withMessage('Debes completar este campo'),
  check('idioma')
    .notEmpty()
    .withMessage('Debes completar este campo')
];


//  RUTAS

// Renderiza todos los productos
router.get('/',authValidator, productController.getAll );
// Renderiza el detalle de un producto
router.get('/detalle/:id', productController.getOne);
// Renderiza el formulario para crear un producto
router.get('/create', productController.showForm);
// Crea un Producto a partir del formulario cargado
router.post('/create' , upload.single('portada'), formsValidations ,productController.createBook);
// Editar Producto
router.get('/edit/:id', productController.showFormEdit);
router.put('/edit/:id', productController.editBook);
// Eliminar Producto
router.delete('/delete/:id', productController.destroyProduct);




router.get('/productCart', function(req, res) {
    res.render('productCart', { title: 'Express' });
  });
  




    

module.exports = router;
