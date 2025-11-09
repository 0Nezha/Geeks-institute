const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    user: "postgres",       
    host: "localhost",
    database: "userManagement",     
    password: "postgresql",
    port: 5000,
    },
});

// Vérification de la connexion
db.raw('SELECT 1')
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err.message));
  
module.exports = db;
