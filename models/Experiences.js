const { pool } = require('../db');

const Experiences = pool.define('Experiences', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // génère automatiquement l’UUID
    primaryKey: true
   },
   response_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
      model: 'Responses',
      key: 'id'
    }
    },
    etablissement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    poste: {
        type: DataTypes.ENUM('Secrétaire du Bureau de Coordination', 'Membre du Bureau de Coordination','Secrétaire Général du Comité','Membre du Comité AEEM'),
        allowNull: false,
    },
    poste_precision: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  
}, {
  timestamps: true,  // créé automatiquement createdAt et updatedAt
  tableName: 'Experiences',//utiliser le nom de la classe pour le nom de la table
  updatedAt: false,
});

module.exports = Experiences;
