var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')

const dbproducts = path.join(__dirname, '../Database/dbproducts.json')

const products = JSON.parse(fs.readFileSync(dbproducts, 'utf-8'))


/* GET users listing. */
router.get('/', function(req, res) {
    res.render('products', { products })
});
router.get('/detalle/:id', function(req, res) {
  let id = req.params.id
  let productoBuscado = products.find(product => product.id == id)
  res.render('productDetail', { productoBuscado });
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
      res.render('createProduct');
    });
    router.post('/create', function(req, res) {
      /* falta la logica para cargarlo en la dbproducts.json*/
      res.redirect('products', { title: 'Express' });
    });
    

module.exports = router;
