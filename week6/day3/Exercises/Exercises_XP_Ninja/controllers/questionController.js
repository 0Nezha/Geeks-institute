const Question = require('../models/questionModel');

// GET /api/questions/:id
exports.getQuestion = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const question = await Question.findByIdWithOptions(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    // On renvoie question sans révéler correct_option_id au frontend
    const { id: qid, question: text, options } = question;
    res.json({ id: qid, question: text, options });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/questions/random
exports.getRandomQuestion = async (req, res) => {
  try {
    const ids = await Question.findAllIds();
    if (ids.length === 0) return res.status(404).json({ message: 'No questions' });
    const randId = ids[Math.floor(Math.random() * ids.length)];
    const question = await Question.findByIdWithOptions(randId);
    const { id: qid, question: text, options } = question;
    res.json({ id: qid, question: text, options });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/answer  { questionId, selectedOptionId }
exports.submitAnswer = async (req, res) => {
  try {
    const { questionId, selectedOptionId } = req.body;
    if (!questionId || !selectedOptionId) {
      return res.status(400).json({ message: 'questionId and selectedOptionId required' });
    }

    const result = await Question.checkAnswer(questionId, selectedOptionId);
    if (result === null) return res.status(404).json({ message: 'Question not found' });

    res.json({
      correct: result.correct,
      correctOptionId: result.correct_option_id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
