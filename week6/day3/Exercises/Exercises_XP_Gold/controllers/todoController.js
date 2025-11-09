const Todo = require("../models/todoModel");

// Créer un todo
exports.createTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await Todo.create(title, completed);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer tous les todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un todo
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const updated = await Todo.update(req.params.id, title, completed);
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un todo
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.delete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
