const express = require("express");
const path = require("path");
const greetRouter = require("./routes/greet");

const app = express();
const PORT = 3000;

// Middleware pour parser POST
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Utiliser le router pour /greet
app.use("/", greetRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
