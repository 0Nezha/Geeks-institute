import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(express.json());


app.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title,
      content
    });
    res.status(201).json({ message: "Post created", post: response.data });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      title,
      content
    });
    res.json({ message: `Post ${id} updated`, post: response.data });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    res.json({ message: `Post ${id} deleted` });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});