const express = require('express');
const router = express.Router();
const {surveyController,responseController} = require('../controllers/responseController');

// Définir la route POST pour le formulaire
router.post('/submit', surveyController.submitSurvey);

router.get('/responses', responseController.getResponses);
module.exports = router;