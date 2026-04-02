const { pool } = require('../db');

const Admins = pool.define('Admins', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // génère automatiquement l’UUID
    primaryKey: true
   },
    name: {
        type: DataTypes.STRING,
        allowNull: false,  // champ obligatoire
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
        isEmail: true, // validation email
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
  timestamps: true,  // créé automatiquement createdAt et updatedAt
  tableName: 'Admins',//utiliser le nom de la classe pour le nom de la table
  updatedAt: false,
});

module.exports = Admins;
