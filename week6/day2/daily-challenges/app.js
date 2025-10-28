// app.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const quizRouter = require("./routes/quiz");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers HTML statiques depuis /view
app.use(express.static(path.join(__dirname, "view")));

// Routes
app.use("/quiz", quizRouter);

// Route d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
