const express = require("express");
const mongoose = require("mongoose");
// Importando o model Categoria

require("../models/Categoria");
const Categoria = mongoose.model("categorias");

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

router.post("/categorias/nova", (req, res) => {
  const novaCategoria = {
    nome: req.body.nome,
    slug: req.body.slug,
  };

  new Categoria(novaCategoria)
    .save()
    .then(() => {
      console.log("Categoria salva com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao salvar a categoria: " + err);
    });
});

router.get("/categorias", (req, res) => {
  res.render("admin/categorias");
});

// Exportando o router para acessar no app.js
module.exports = router;
