const { pool } = require('../db');

const Responses = pool.define('Responses', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // génère automatiquement l’UUID
    primaryKey: true
   },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,  // champ obligatoire
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    poste: {
        type: DataTypes.ENUM('Secrétaire du Bureau de Coordination', 'Membre du Bureau de Coordination','Secrétaire Général du Comité','Membre du Comité AEEM'),
        allowNull: false,
    },
    poste_precision: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  
}, {
  timestamps: true,  // créé automatiquement createdAt et updatedAt
  tableName: 'Responses',//utiliser le nom de la classe pour le nom de la table
  updatedAt: false,
});

module.exports = Responses;
