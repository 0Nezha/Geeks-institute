const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcrypt");

const router = express.Router();
const filePath = path.join(__dirname, "../data/users.json");

// Helper pour lire le fichier
async function readUsers() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper pour écrire dans le fichier
async function writeUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

// POST /register
router.post("/register", async (req, res) => {
  const { name, lastName, email, username, password } = req.body;

  if (!name || !lastName || !email || !username || !password)
    return res.status(400).json({ message: "All fields are required." });

  const users = await readUsers();
  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser)
    return res.status(400).json({ message: "User already exists!" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    name,
    lastName,
    email,
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  await writeUsers(users);

  res.json({ message: "Hello Your account is now created!", user: newUser });
});

// POST /login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required." });

  const users = await readUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: "Username is not registered" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

  res.json({ message: `Hi ${user.name} welcome back again!`, user });
});

// GET /users
router.get("/", async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

// GET /users/:id
router.get("/:id", async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found!" });
  res.json(user);
});

// PUT /users/:id
router.put("/:id", async (req, res) => {
  const { name, lastName, email, username } = req.body;
  const users = await readUsers();
  const userIndex = users.findIndex(u => u.id == req.params.id);
  if (userIndex === -1) return res.status(404).json({ message: "User not found!" });

  users[userIndex] = { ...users[userIndex], name, lastName, email, username };
  await writeUsers(users);

  res.json({ message: "User updated successfully!", user: users[userIndex] });
});

module.exports = router;
