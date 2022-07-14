const fs = require("fs");
const path = require("path");
const multer = require('multer');



// LLamado a el archivo JSON
const dbproducts = path.join(__dirname, "../Database/dbproducts.json");
const products = JSON.parse(fs.readFileSync(dbproducts, "utf-8"));


const productController = {
  getAll: (req, res) => {
    
    res.render("products", { products });
  },
  getOne: (req, res) => {
    let id = req.params.id;
    let productoBuscado = products.find((product) => product.id == id);
    res.render("productDetail", { productoBuscado });
  },
  showForm: (req, res) => {
    let allCategories = [];
    let allFormatos = [];
    // Recorro todo elarray para obtener solo la categoría
    products.map((product) => {
      allCategories.push(product.categoria);
    });
    // Recorro todo elarray para obtener solo el formato
    products.map((product) => {
      allFormatos.push(product.formato);
    });
    // Con SET quito los duplicado del Array
    let categorias = [...new Set(allCategories)];
    let formatos = [...new Set(allFormatos)];
    //Ordeno el array
    categorias = categorias.sort();
    formatos = formatos.sort();
    res.render("createProduct", { categorias, formatos });
  },  
  createBook: (req, res) => {
    let idDefinition = products.length + 1;
    console.log(req.file)
    let {
      titulo,
      autor,
      portada,
      descripcion,
      isbn,
      categoria,
      numero_paginas,
      formato,
      precio,
      peso,
      idioma,
    } = req.body;

    let newBook = {
      id : idDefinition,
      titulo,
      autor,
      portada,
      descripcion,
      isbn,
      categoria,
      numero_paginas,
      formato,
      precio,
      peso,
      idioma,
    };

    //Asignación del nombre de la imagen para poder guardarla en BBDD
    newBook.portada =  req.file.filename;

    products.unshift(newBook);
    let productsReady = JSON.stringify(products)
    fs.writeFileSync('./Database/dbproducts.json', productsReady)

    // console.log(productsReady)
    res.redirect("/products");
  },
  showFormEdit: (req, res) => {

    let itemToEdit = products.find( product => product.id == req.params.id );

    let allCategories = [];
    let allFormatos = [];
    // Recorro todo el array para obtener solo la categoría
    products.map((product) => {
      allCategories.push(product.categoria);
    });
    // Recorro todo el array para obtener solo el formato
    products.map((product) => {
      allFormatos.push(product.formato);
    });
    // Con SET quito los duplicado del Array
    let categorias = [...new Set(allCategories)];
    let formatos = [...new Set(allFormatos)];
    //Ordeno el array
    categorias = categorias.sort();
    formatos = formatos.sort();

    res.render("editProduct", { categorias, formatos, itemToEdit });
  },
  editBook: (req, res) => {

    const idBuscado = req.params.id

    let productModification = {
      titulo,
      autor,
      portada,
      descripcion,
      isbn,
      categoria,
      numero_paginas,
      formato,
      precio,
      peso,
      idioma,
    } = req.body;

    let updatedBook = {
      id : idBuscado,
      ...productModification
    };


    for (const i in products) {
      if (products[i].id == idBuscado)  {
        products[i] = updatedBook;
        break;        
      }
    }

    fs.writeFileSync('./Database/dbproducts.json', JSON.stringify(products), {encoding: 'utf-8'})


    res.redirect("/products");
  },
  destroyProduct: (req, res) => {

    let idBuscado = req.params.id;
    
    let productUpdatedList = products.filter( product => product.id != idBuscado );
    
    fs.writeFileSync('./Database/dbproducts.json', JSON.stringify(productUpdatedList), {encoding: 'utf-8'});

    res.redirect('/products');   


  }
};

module.exports = productController;
