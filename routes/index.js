var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let mensaje = res.locals.message
  res.render('index', {mensaje});
});



module.exports = router;
