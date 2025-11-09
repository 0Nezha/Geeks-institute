const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db');

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// Test de connexion à la base de données
db.raw('SELECT 1')
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch((err) => console.error('❌ Database connection error:', err.message));

// Routes principales
app.use('/api', userRoutes);

// Gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});