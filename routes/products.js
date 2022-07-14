var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const productController = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/productImages'))
  },
  filename: function (req, file, cb) {
    cb(null, 'product-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


// Renderiza todos los productos
router.get('/', productController.getAll );
// Renderiza el detalle de un producto
router.get('/detalle/:id', productController.getOne);
// Renderiza el formulario para crear un producto
router.get('/create', productController.showForm);
// Crea un Producto a partir del formulario cargado
router.post('/create', upload.single('portada') ,productController.createBook);
// Editar Producto
router.get('/edit/:id', productController.showFormEdit);
router.put('/edit/:id', productController.editBook);
// Eliminar Producto
router.delete('/delete/:id', productController.destroyProduct);




router.get('/productCart', function(req, res) {
    res.render('productCart', { title: 'Express' });
  });
  




    

module.exports = router;
