import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 4000;

app.use(express.json());

let todos = [];

app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  try {
    if (title) {
      const newTodo = { id: uuidv4(), title, completed: false };
      todos.push(newTodo);
      res
        .status(201)
        .json({ message: "Todo created successfully", todo: newTodo });
    } else {
      res.status(400).json({ error: "Title is required" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/api/todos", (req, res) => {
  try {
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  try {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.title = title !== undefined ? title : todo.title;
      todo.completed = completed !== undefined ? completed : todo.completed;
      res.json({ message: "Todo updated successfully", todo });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  try {
    todos = todos.filter((t) => t.id !== id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});