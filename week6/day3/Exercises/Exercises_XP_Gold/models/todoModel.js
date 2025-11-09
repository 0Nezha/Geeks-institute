const pool = require("../config/db");

// Créer un task
exports.create = async (title, completed = false) => {
  const result = await pool.query(
    "INSERT INTO tasks  (title, completed) VALUES ($1, $2) RETURNING *",
    [title, completed]
  );
  return result.rows[0];
};

// Récupérer tous les tasks 
exports.getAll = async () => {
  const result = await pool.query("SELECT * FROM tasks  ORDER BY id ASC");
  return result.rows;
};

// Récupérer un task par ID
exports.getById = async (id) => {
  const result = await pool.query("SELECT * FROM tasks  WHERE id = $1", [id]);
  return result.rows[0];
};

// Mettre à jour un task
exports.update = async (id, title, completed) => {
  const result = await pool.query(
    "UPDATE tasks  SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title, completed, id]
  );
  return result.rows[0];
};

// Supprimer un task
exports.delete = async (id) => {
  await pool.query("DELETE FROM tasks  WHERE id = $1", [id]);
};
