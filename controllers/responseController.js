const { pool } = require('../db');

exports.submitSurvey = async (req, res) => {
    try {
        // 1. On récupère les données
        const { nom, prenom, adresse, telephone, poste, poste_precision, experiences } = req.body;

        // 2. Requête ultra-sécurisée avec guillemets doubles pour CHAQUE champ
        // On s'assure que l'ordre des $1..$6 correspond exactement au tableau final
        const queryText = `
            INSERT INTO "Responses" 
            ("nom", "prenom", "adresse", "telephone", "poste", "poste_precision") 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id
        `;
        
        const values = [
            nom || null, 
            prenom || null, 
            adresse || null, 
            telephone || null, 
            poste || null, 
            poste_precision || null
        ];

        const userRes = await pool.query(queryText, values);
        const responseId = userRes.rows[0].id;

        // 3. Insertion des expériences
        if (experiences && experiences.length > 0) {
            for (let exp of experiences) {
                await pool.query(
                    'INSERT INTO "Experiences" ("response_id", "annee", "etablissement", "poste") VALUES ($1, $2, $3, $4)',
                    [responseId, exp.annee, exp.etablissement, exp.poste]
                );
            }
        }

        res.status(201).json({ message: "Succès !" });
    } catch (err) {
        // CRITIQUE : Ceci va afficher la VRAIE raison dans le toast (ex: table manquante, etc.)
        console.error("DEBUG BACKEND:", err);
        res.status(500).json({ error: "Détail : " + err.message });
    }
};