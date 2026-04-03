const { pool } = require('../db');

exports.submitSurvey = async (req, res) => {
    try {
        const { nom, prenom, adresse, telephone, poste, poste_precision, experiences } = req.body;

        // 1. Insertion dans la table Responses
        // Note : On utilise "precision" car c'est le nouveau nom dans ta BDD
        const queryText = `
            INSERT INTO "Responses" 
            ("nom", "prenom", "adresse", "telephone", "poste", "precision") 
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

        // 2. Insertion dans la table Experiences
        if (experiences && experiences.length > 0) {
            // Supprimer les doublons potentiels envoyés dans le JSON
            const uniqueYears = [...new Set(experiences.map(e => e.annee))];
            if (uniqueYears.length !== experiences.length) {
                return res.status(400).json({ error: "Doublons d'années détectés." });
            }
            for (let exp of experiences) {
                await pool.query(
                    'INSERT INTO "Experiences" ("response_id", "annee", "etablissement", "poste") VALUES ($1, $2, $3, $4)',
                    [responseId, exp.annee, exp.etablissement, exp.poste]
                );
            }
        }

        res.status(201).json({ message: "Enregistrement réussi !" });

    } catch (err) {
        console.error("ERREUR CRITIQUE BDD :", err.message);
        // On renvoie l'erreur précise pour que tu la voies dans le Toast
        res.status(500).json({ error: "Erreur : " + err.message });
    }
};

exports.getResponses = async (req, res) => {
    try {
        // Récupère toutes les réponses triées par date
        const responsesResult = await pool.query('SELECT * FROM "Responses" ORDER BY created_at DESC');
        const responses = responsesResult.rows;

        // Récupère toutes les expériences
        const expsResult = await pool.query('SELECT * FROM "Experiences"');
        const allExperiences = expsResult.rows;

        // Fusionne les expériences dans leurs réponses respectives
        const data = responses.map(resp => ({
            ...resp,
            experiences: allExperiences.filter(exp => exp.response_id === resp.id)
        }));

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de la récupération des données" });
    }
};