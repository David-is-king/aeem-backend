const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/responseController');

// Définir la route POST pour le formulaire
router.post('/submit', surveyController.submitSurvey);

router.get('/responses', surveyController.getResponses);
module.exports = router;