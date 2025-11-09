const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Routes API
app.use("/api/users", userRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
