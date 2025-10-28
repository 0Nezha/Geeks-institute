import express from "express";
import blogRouter from "./routes/posts.js"; 

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle invalid JSON gracefully
app.use((err, req, res, next) => {
  const isJsonParseError =
    err &&
    (err.type === "entity.parse.failed" ||
      err instanceof SyntaxError ||
      err.status === 400);
  if (isJsonParseError) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  return next(err);
});

// Mount router
app.use("/posts", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
