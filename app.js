// Carregando módulos

const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

// serve para trabalhar com diretórios e manipular pastas
const path = require("path");

// Chamando as rotas de admin do ./routes/admin.js
const admin = require("./routes/admin");

// Configurações

// Mongoose

// Conexão com o banco de dados

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("Conectado ao mongo");
  })
  .catch((err) => {
    console.log("Erro ao se conectar: " + err);
  });

// Body Parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Public

// Serve para definir a pasta public como a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Handlebars

app.engine(
  "handlebars",
  engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// Rotas
app.get("/", (req, res) => {
  res.send("Página principal do site");
});
app.use("/admin", admin);

// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor rodando na url http://localhost:8081");
});
