const express = require("express");
const router = express.Router();
const triviaQuestions = require("../models/trivia");

// Variables pour suivre la progression du quiz
let currentQuestionIndex = 0;
let score = 0;

// 🟢 GET /quiz - Démarrer le quiz
router.get("/", (req, res) => {
  currentQuestionIndex = 0;
  score = 0;
  const question = triviaQuestions[currentQuestionIndex].question;

  res.send(`
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>🎯 Trivia Quiz Game</title>
            <style>
            body {
                font-family: "Poppins", Arial, sans-serif;
                background: linear-gradient(135deg, #89f7fe, #66a6ff);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0;
            }

            .quiz-box {
                background: #ffffff;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                text-align: center;
                width: 400px;
                transition: transform 0.3s ease;
            }

            .quiz-box:hover {
                transform: translateY(-3px);
            }

            h1 {
                color: #333;
                font-size: 1.8rem;
                margin-bottom: 20px;
            }

            h3 {
                color: #555;
                font-weight: 500;
                margin-bottom: 15px;
            }

            input {
                width: 80%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 8px;
                outline: none;
                font-size: 1rem;
                transition: border-color 0.3s;
            }

            input:focus {
                border-color: #6a11cb;
            }

            button {
                margin-top: 20px;
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
            }

            button:hover {
                background: linear-gradient(135deg, #2575fc, #6a11cb);
                transform: scale(1.05);
            }

            @media (max-width: 450px) {
                .quiz-box {
                width: 90%;
                padding: 25px;
                }
            }
            </style>
        </head>

        <body>
            <div class="quiz-box">
            <h1>🎯 Trivia Quiz Game</h1>
            <form action="/quiz" method="POST">
                <h3>${question}</h3>
                <input type="text" name="answer" placeholder="Your answer" required />
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            </div>
        </body>
    </html>

  `);
});

// 🟡 POST /quiz - Vérifie la réponse et affiche la question suivante
router.post("/", (req, res) => {
  const userAnswer = req.body.answer?.trim().toLowerCase();
  const correctAnswer = triviaQuestions[currentQuestionIndex].answer.toLowerCase();

  let feedback = "";
  let isCorrect = false;

  if (userAnswer === correctAnswer) {
    score++;
    feedback = "✅ Correct!";
    isCorrect = true;
  } else {
    feedback = `❌ Wrong! The correct answer was <b>${triviaQuestions[currentQuestionIndex].answer}</b>.`;
    isCorrect = false;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < triviaQuestions.length) {
    const nextQuestion = triviaQuestions[currentQuestionIndex].question;

    res.send(`
      <html>
        <head>
          <title>Trivia Quiz</title>
          <style>
            body {
                font-family: "Poppins", Arial, sans-serif;
                background: linear-gradient(135deg, #89f7fe, #66a6ff);
                height: 100vh;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .quiz-box {
                background: #ffffff;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                text-align: center;
                width: 400px;
                animation: fadeIn 0.6s ease;
                transition: transform 0.3s ease;
            }

            .quiz-box:hover { transform: translateY(-3px); }

            @keyframes fadeIn { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }

            h1 { color: #333; font-size: 1.8rem; margin-bottom: 20px; }
            h3 { color: #555; font-weight: 500; margin-bottom: 15px; }

            .feedback { font-weight: bold; margin-bottom: 15px; font-size: 1.1rem; }
            .feedback.correct { color: #28a745; }
            .feedback.incorrect { color: #dc3545; }

              .next-label {
                color: #2575fc;
                font-weight: 600;
                margin-bottom: 8px;
                font-size: 1rem;
                animation: fadeIn 0.5s ease;
                }


            input {
                width: 80%;
                padding: 10px;
                border-radius: 8px;
                border: 1px solid #ccc;
                font-size: 1rem;
                outline: none;
                transition: border-color 0.3s ease;
            }
            input:focus { border-color: #2575fc; }

            button {
                background: linear-gradient(135deg, #2575fc, #6a11cb);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 8px;
                font-weight: bold;
                margin-top: 20px;
                cursor: pointer;
                transition: transform 0.2s, background 0.3s;
            }
            button:hover {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                transform: scale(1.05);
            }

            @media (max-width: 450px) { .quiz-box { width: 90%; padding: 25px; } }
          </style>
        </head>
        <body>
          <div class="quiz-box">
            <h1>🎯 Trivia Quiz Game</h1>
            <div class="feedback ${isCorrect ? "correct" : "incorrect"}">${feedback}</div>
            <form action="/quiz" method="POST">     
              <h3 class="next-label">Next question:</h3>
              <h3>${nextQuestion}</h3>
              <input type="text" name="answer" placeholder="Your answer" required />
              <br /><br />
              <button type="submit">Next</button>
            </form>
          </div>
        </body>
      </html>
    `);
  } else {
    res.redirect("/quiz/score");
  }
});

// 🔵 GET /quiz/score - Affiche le score final
router.get("/score", (req, res) => {
  res.send(`
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Score</title>
            <style>
                body {
                font-family: "Poppins", Arial, sans-serif;
                background: linear-gradient(135deg, #74ebd5, #acb6e5);
                height: 100vh;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                }

                .score-box {
                background: #ffffff;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                text-align: center;
                width: 400px;
                animation: fadeIn 0.6s ease;
                transition: transform 0.3s ease;
                }

                @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
                }

                h1 {
                color: #333;
                font-size: 1.8rem;
                margin-bottom: 20px;
                }

                h2 {
                color: #555;
                font-weight: 500;
                margin-bottom: 20px;
                font-size: 1.3rem;
                }

                a {
                text-decoration: none;
                background: linear-gradient(135deg, #2575fc, #6a11cb);
                color: white;
                padding: 12px 25px;
                border-radius: 8px;
                font-weight: bold;
                transition: transform 0.2s, background 0.3s;
                display: inline-block;
                }

                a:hover {
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                transform: scale(1.05);
                }

                @media (max-width: 450px) {
                .score-box {
                    width: 90%;
                    padding: 25px;
                }
                }
            </style>
        </head>
        <body>
            <div class="score-box">
                <h1>🏁 Quiz Completed!</h1>
                <h2>Your Score: ${score} / ${triviaQuestions.length}</h2>
                <a href="/quiz">🔁 Back to Home</a>
            </div>
        </body>
    </html>
  `);
});

module.exports = router;
