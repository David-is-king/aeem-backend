const {pool} = require('../db');

exports.submitSurvey = async (req, res) => {
    try {
        const { nom, prenom, adresse, telephone,poste_precision, poste, experiences } = req.body;

        // 1. Insérer le profil
        const userRes = await pool.query(
            'INSERT INTO "Responses" (nom, prenom, adresse, telephone, poste_precision,poste) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [nom, prenom, adresse, telephone,poste_precision, poste]
        );
        const responseId = userRes.rows[0].id;

        // 2. Insérer les expériences (si présentes)
        if (experiences && experiences.length > 0) {
            for (let exp of experiences) {
                await pool.query(
                    'INSERT INTO "Experiences" (response_id, annee, etablissement, poste) VALUES ($1, $2, $3, $4)',
                    [responseId, exp.annee, exp.etablissement, exp.poste]
                );
            }
        }

        res.status(201).json({ message: "Formulaire enregistré avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'enregistrement" });
    }
};