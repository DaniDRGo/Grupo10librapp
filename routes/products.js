var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/productCart', function(req, res) {
    res.render('productCart', { title: 'Express' });
  });
  router.get('/productDetail', function(req, res) {
    res.render('productDetail', { title: 'Express' });
  });
  // cambiar el verbo HTTP
  router.get('/edit', function(req, res) {
    res.render('editProduct', { title: 'Express' });
  });

    // cambiar el verbo HTTP
    router.get('/create', function(req, res) {
      res.render('createProduct', { title: 'Express' });
    });

module.exports = router;
