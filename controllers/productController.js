const fs = require("fs");
const path = require("path");

// LLamado a el archivo JSON
const dbproducts = path.join(__dirname, "../Database/dbproducts.json");
const products = JSON.parse(fs.readFileSync(dbproducts, "utf-8"));

const productController = {
  getAll: (req, res) => {
    products.reverse();
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
    products.map((product) => {
      allCategories.push(product.categoria);
    });
    products.map((product) => {
      allFormatos.push(product.formato);
    });
    let categorias = [...new Set(allCategories)];
    let formatos = [...new Set(allFormatos)];
    categorias = categorias.sort();
    formatos = formatos.sort();

    res.render("createProduct", { categorias, formatos });
  },

  createBook: (req, res) => {
    let idDefinition = products.length + 1;
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

    console.log(newBook)

    products.push(newBook);
    let productsReady = JSON.stringify(products)
    fs.writeFileSync('./Database/dbproducts.json', productsReady)

    // console.log(productsReady)
    res.redirect("/products");
  },
};

module.exports = productController;
