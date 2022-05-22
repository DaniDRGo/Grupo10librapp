const express = require("express");
const app = express();

const path = require("path");

const port = 5000;

//Rutas del Servidor
app.get("/", (req, res) => {
  res.send("Página de Home"); // Cambiar por el .html correspondiente
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/register.html')); // Cambiar por el .html correspondiente
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/login.html')); // Cambiar por el .html correspondiente
});

app.get("/shopping-cart", (req, res) => {
  res.send("Página de Carito de Compras"); // Cambiar por el .html correspondiente
});

// Levantando el servidor
app.listen(port, () => {
  console.log(`Server on Port ${port}`);
});
