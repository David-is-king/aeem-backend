const { pool } = require('../db');

exports.submitSurvey = async (req, res) => {
    try {
        const { nom, prenom, adresse, telephone, precision, poste, experiences } = req.body;

        // On utilise des doubles guillemets pour CHAQUE nom de colonne.
        // Cela force PostgreSQL à chercher exactement le nom tel qu'il est écrit dans Supabase.
        const userRes = await pool.query(
            'INSERT INTO "Responses" ("nom", "prenom", "adresse", "telephone", "precision", "poste") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [nom, prenom, adresse, telephone, precision, poste]
        );
        
        const responseId = userRes.rows[0].id;

        // 2. Insérer les expériences (si présentes)
        if (experiences && experiences.length > 0) {
            for (let exp of experiences) {
                // On applique la même sécurité sur la table Experiences
                await pool.query(
                    'INSERT INTO "Experiences" ("response_id", "annee", "etablissement", "poste") VALUES ($1, $2, $3, $4)',
                    [responseId, exp.annee, exp.etablissement, exp.poste]
                );
            }
        }

        res.status(201).json({ message: "Formulaire enregistré avec succès !" });
    } catch (err) {
        console.error("Erreur SQL détaillée:", err.message);
        // On renvoie l'erreur brute pour voir exactement ce que dit la base de données
        res.status(500).json({ error: "Erreur BDD : " + err.message });
    }
};