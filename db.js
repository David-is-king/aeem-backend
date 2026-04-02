const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'aeemDB',
  password: process.env.DB_PASSWORD || 'Admin',
  port: process.env.DB_PORT || 5433,
});

// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DB_NAME || 'aeemDB',
//   password: process.env.DB_PASSWORD || 'root',
//   port: process.env.DB_PORT || 5433,
// });

// Vérification de la connexion au démarrage
const connectDB = async () => {
  try {
    const client = await pool.connect(); 
    console.log('✅ Connecté à PostgreSQL sur le port', process.env.DB_PORT || 5433);
    client.release(); // On libère le client immédiatement
  } catch (err) {
    console.error('❌ Erreur de connexion PostgreSQL :', err.message);
    process.exit(1); // Arrête le serveur si la DB n'est pas là
  }
};

module.exports = { pool, connectDB };