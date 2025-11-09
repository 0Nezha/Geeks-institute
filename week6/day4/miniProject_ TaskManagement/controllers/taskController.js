const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

// Lire les tâches depuis le fichier
function readTasks() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Écrire les tâches dans le fichier
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// ✅ Obtenir toutes les tâches
exports.getAllTasks = (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Erreur lors de la lecture des tâches." });
  }
};

// ✅ Obtenir une tâche par ID
exports.getTaskById = (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Tâche non trouvée." });
  res.json(task);
};

// ✅ Créer une nouvelle tâche
exports.createTask = (req, res) => {
  const { title, content, firstname, lastname } = req.body;
  if (!title || !content || !firstname || !lastname)
    return res.status(400).json({ message: "Tous les champs sont requis." });

  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title,
    content,
    firstname,
    lastname,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ message: "Tâche créée avec succès.", newTask });
};

// ✅ Mettre à jour une tâche
exports.updateTask = (req, res) => {
  const { title, content, firstname, lastname, completed } = req.body;
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Tâche non trouvée." });

  tasks[index] = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    content: content ?? tasks[index].content,
    firstname: firstname ?? tasks[index].firstname,
    lastname: lastname ?? tasks[index].lastname,
    completed: completed ?? tasks[index].completed,
  };

  writeTasks(tasks);
  res.json({ message: "Tâche mise à jour avec succès.", task: tasks[index] });
};

// ✅ Supprimer une tâche
exports.deleteTask = (req, res) => {
  const tasks = readTasks();
  const filtered = tasks.filter((t) => t.id != req.params.id);

  if (filtered.length === tasks.length)
    return res.status(404).json({ message: "Tâche non trouvée." });

  writeTasks(filtered);
  res.json({ message: "Tâche supprimée avec succès." });
};
