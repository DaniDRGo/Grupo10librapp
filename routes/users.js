var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/edit', function(req, res) {
  res.render('editUser');
});

router.get('/register', function(req, res) {
  res.render('register', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
