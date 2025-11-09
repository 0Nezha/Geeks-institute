const express = require('express');
const router = express.Router();
const ctrol = require('../controllers/questionController');

router.get('/random', ctrol.getRandomQuestion);
router.get('/:id', ctrol.getQuestion);
router.post('/answer', ctrol.submitAnswer);

module.exports = router;
