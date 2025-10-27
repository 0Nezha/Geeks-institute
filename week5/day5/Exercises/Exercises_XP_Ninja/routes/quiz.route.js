import express from "express";

const router = express.Router();

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Jupiter", "Mars", "Saturn"],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const getState = () => {
  const total = questions.length;
  const completed = currentQuestionIndex >= total;
  const base = { index: currentQuestionIndex, total, score, completed };
  if (completed) return base;
  const q = questions[currentQuestionIndex];
  return { ...base, question: q.question, answers: q.answers };
};

router.get("/", (req, res) => {
  res.json(getState());
});


router.post("/answer", (req, res) => {
  const raw = req.body?.answer;
  const userAnswer = typeof raw === "string" ? Number(raw) : Number(raw);
  const current = questions[currentQuestionIndex];

  if (!Number.isInteger(userAnswer) || !current) {
    return res.status(400).json({ error: "Invalid answer" });
  }

  const correct = userAnswer === current.correct;
  if (correct) score += 1;

  currentQuestionIndex += 1;

  res.json({ correct, ...getState() });
});

// POST /api/quiz/reset -> resets state
router.post("/reset", (req, res) => {
  currentQuestionIndex = 0;
  score = 0;
  res.json(getState());
});

export default router;