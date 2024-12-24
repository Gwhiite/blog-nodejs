const express = require("express");

// Usado para criar rotas em arquivos separados
const router = express.Router();

// Rotas

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Página de posts");
});

router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});

router.get("/categorias", (req, res) => {
  res.render("admin/categorias");
});

// Exportando o router para acessar no app.js
module.exports = router;
