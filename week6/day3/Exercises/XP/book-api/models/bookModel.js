const pool = require("../config/db");

// Récupérer tous les livres
exports.findAll = async () => {
  const result = await pool.query("SELECT * FROM books ORDER BY id ASC");
  return result.rows;
};

// Récupérer un livre par ID
exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

// Créer un nouveau livre
exports.create = async (title, author, publishedYear) => {
  const result = await pool.query(
    "INSERT INTO books (title, author, publishedYear) VALUES ($1, $2, $3) RETURNING *",
    [title, author, publishedYear]
  );
  return result.rows[0];
};

// Mettre à jour un livre
exports.update = async (id, title, author, publishedYear) => {
  const result = await pool.query(
    "UPDATE books SET title=$1, author=$2, publishedYear=$3 WHERE id=$2 RETURNING *",
    [title, author, publishedYear, id]
  );
  return result.rows[0];
};

// Supprimer un livre
exports.delete = async (id) => {
  const result = await pool.query("DELETE FROM books WHERE id=$1 RETURNING *", [id]);
  return result.rows[0];
};
