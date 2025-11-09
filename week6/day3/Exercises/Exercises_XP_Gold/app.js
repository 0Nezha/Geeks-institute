const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");

app.use(express.json()); // pour lire le JSON

app.use("/api/todos", todoRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
