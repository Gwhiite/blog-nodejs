// Carregando módulos

const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

// serve para trabalhar com diretórios e manipular pastas
const path = require("path");

// Importando as rotas de admin do ./routes/admin.js
const admin = require("./routes/admin");

// Configurações

// Session

app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// Middleware

app.use((req, res, next) => {
  // Criação de variaveis globais a partir do "res.locals"
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

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
