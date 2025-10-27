import express from "express";
import { fetchPosts } from "./data/dataService.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
    console.log("Data retrieved successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});