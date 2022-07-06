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



router.get('/productCart', function(req, res) {
    res.render('productCart', { title: 'Express' });
  });
  
  // cambiar el verbo HTTP
  router.get('/:id/edit', function(req, res) {
    res.render('editProduct', { title: 'Express' });
    });
    router.put('/:id/edit', function(req, res) {
      /* falta la logica para cargarlo en la dbproducts.json*/
      res.redirect('editProduct', { title: 'Express' });
      });

      router.delete('/:id', function(req, res) {
        /* falta la logica para cargarlo en la dbproducts.json*/
        res.redirect('products', { title: 'Express' });
        });


    

module.exports = router;
