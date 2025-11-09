const express = require('express');
const path = require('path');
const app = express();

const questionRoutes = require('./routes/questionRoutes');

app.use(express.json());
app.use('/api/questions', questionRoutes);

// servir frontend statique
app.use(express.static(path.join(__dirname, '..', 'public')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
