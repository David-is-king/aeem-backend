const express = require('express');
const cors = require('cors');
require('dotenv').config();
const responseRoutes = require('./routes/responseRoutes');

const app = express();

// Middlewares
app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json()); // Permet de lire le JSON envoyé par le front
app.use(express.static('public')); // Sert tes fichiers HTML/CSS/JS

// Routes
app.use('/api', responseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur : http://localhost:${PORT}`);
});