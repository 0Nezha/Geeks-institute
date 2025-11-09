const express = require("express");
const postRoutes = require("./routes/postRoutes");
const app = express();
const PORT = 3000;

// Routes
app.use("/posts", postRoutes);

// Invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


