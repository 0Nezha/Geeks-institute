const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");

// Middleware pour lire les données JSON
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

// Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
