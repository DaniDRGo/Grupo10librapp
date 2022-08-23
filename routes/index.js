const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

/* GET home page. */
router.get('/',  async function  (req, res) {

  const user = req.session.user
  let libros = await fetch('https://fakerapi.it/api/v1/books?_quantity=20').then(response =>  response.json() );  // Se usará para info de la card
  let images = await fetch('https://api.unsplash.com/photos/random/?client_id=rA9KqTGdsd5kBu7Z4za_GHlhSo_gybKzDmNb5V0r3d4&count=20&orientation=portrait&w=1500&dpr=2').then(response =>  response.json() );

  res.render('index', { user, apiBooks: libros.data, apiImages: images })
  // res.json({ user, apiBooks: libros.data, apiImages: images[0].urls.small })
});



module.exports = router;
