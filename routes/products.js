var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')


// Renderiza todos los productos
router.get('/', productController.getAll );
// Renderiza el detalle de un producto
router.get('/detalle/:id', productController.getOne);
// Renderiza el formulario para crear un producto
router.get('/create', productController.showForm);
// Crea un Producto a partir del formulario cargado
router.post('/create', productController.createBook);
// Editar Producto
router.get('/edit/:id', productController.showFormEdit);
router.put('/edit/:id', productController.editBook);
// Eliminar Producto
router.delete('/delete/:id', productController.destroyProduct);




router.get('/productCart', function(req, res) {
    res.render('productCart', { title: 'Express' });
  });
  




    

module.exports = router;
