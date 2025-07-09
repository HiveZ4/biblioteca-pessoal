require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8082;
const cors = require("cors")

app.use(cors({origin: 'https://biblioteca-pessoal-eta.vercel.app' }));

// Inicializar Prisma
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

// Testar conexão com banco
const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Conectado ao banco de dados PostgreSQL no Neon!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao banco de dados:", err);
  }
};

testConnection();

//built-in middleware to handle url encoded data
//data which user enters in a form
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json data
app.use(express.json());

// Rotas
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/books", require("./routes/api/books"));

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API do Gerenciador de Livros funcionando!" });
});

app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));


