const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Criando modelo Categoria para o banco de dados

const Categoria = new Schema({
  nome: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Exportando o modelo Categoria

module.exports = mongoose.model("categorias", Categoria);
