var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  let message = req.session.message
  const user = req.session.user
  console.log(message)
  res.render('index', {user});
});



module.exports = router;
