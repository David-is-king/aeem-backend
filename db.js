const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test de connexion
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connecté à Supabase PostgreSQL');
    client.release();
  } catch (err) {
    console.error('❌ Erreur de connexion PostgreSQL :', err.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };