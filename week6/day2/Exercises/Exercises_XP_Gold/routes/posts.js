import express from "express";
const router = express.Router();


const blogPosts = [
  {
    id: 1,
    title: "Exploring the Power of JavaScript",
    content:
      "JavaScript has evolved from a simple scripting language into a powerful tool for building modern web applications. In this post, we’ll explore some of its most exciting features and how they can improve your coding workflow.",
    timestamp: new Date(),
  },
  {
    id: 2,
    title: "How to Stay Motivated as a Developer",
    content:
      "Every developer faces moments of burnout and frustration. The key is to stay curious, keep learning, and remember why you started coding in the first place. Here are some personal tips to help you stay inspired.",
    timestamp: new Date(),
  },
  {
    id: 3,
    title: "Building My First API with Express.js",
    content:
      "Creating an API can seem intimidating at first, but Express.js makes it incredibly simple. In this article, I’ll walk you through how I built my very first RESTful API step by step.",
    timestamp: new Date(),
  },
];

// ✅ GET all posts
router.get("/", (req, res) => {
  try {
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ GET one post by ID
router.get("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ CREATE new post
router.post("/", (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content)
      return res.status(400).json({ error: "Title and content are required" });

    const newPost = {
      id: blogPosts.length + 1,
      title,
      content,
      timestamp: new Date(),
    };

    blogPosts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ UPDATE post
router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body || {};
    if (!title || !content)
      return res.status(400).json({ error: "Title and content are required" });

    post.title = title;
    post.content = content;
    post.timestamp = new Date();

    res.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ DELETE post
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const postIndex = blogPosts.findIndex((p) => p.id === id);
    if (postIndex === -1)
      return res.status(404).json({ error: "Post not found" });

    blogPosts.splice(postIndex, 1);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
