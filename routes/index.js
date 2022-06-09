var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/productCart', function(req, res, next) {
  res.render('productCart', { title: 'Express' });
});
router.get('/productDetail', function(req, res, next) {
  res.render('productDetail', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});



module.exports = router;
