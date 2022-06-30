var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('products', { title: 'Express' });
});
router.get('/:id', function(req, res) {
  res.render('productDetail', { title: 'Express' });
});

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

    // cambiar el verbo HTTP
    router.get('/create', function(req, res) {
      res.render('createProduct', { title: 'Express' });
    });
    router.post('/create', function(req, res) {
      /* falta la logica para cargarlo en la dbproducts.json*/
      res.redirect('products', { title: 'Express' });
    });
    

module.exports = router;
