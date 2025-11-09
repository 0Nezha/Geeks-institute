const pool = require('../config/db');

// Récupérer une question par id avec ses options
exports.findByIdWithOptions = async (id) => {
  const qText = `
    SELECT q.id, q.question, q.correct_option_id,
           json_agg(json_build_object('id', o.id, 'text', o.option_text)) AS options
    FROM questions q
    JOIN questions_options qo ON qo.question_id = q.id
    JOIN options o ON o.id = qo.option_id
    WHERE q.id = $1
    GROUP BY q.id
  `;
  const res = await pool.query(qText, [id]);
  return res.rows[0];
};

// Récupérer toutes les questions ids 
exports.findAllIds = async () => {
  const res = await pool.query('SELECT id FROM questions ORDER BY id');
  return res.rows.map(r => r.id);
};

// Vérifier si option est correcte (retourne true/false + correct_option)
exports.checkAnswer = async (questionId, optionId) => {
  const res = await pool.query(
    'SELECT correct_option_id FROM questions WHERE id = $1',
    [questionId]
  );
  if (res.rowCount === 0) return null; // question not found
  const correct = res.rows[0].correct_option_id;
  return { correct: correct === optionId, correct_option_id: correct };
};
