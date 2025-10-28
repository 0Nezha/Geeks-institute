const express = require("express");
const router = express.Router();

// Route POST pour afficher le message personnalisé
router.post("/greet", (req, res) => {
  const { name, emoji } = req.body;

  if (!name) {
    return res.send("<h2 style='color:red'>Please enter your name!</h2>");
  }

  res.send(`
    <html>
      <head>
        <title>Greeting</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            background: linear-gradient(120deg, #ffecd2, #fcb69f);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          h1 { font-size: 2em; color: #333; }
          a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            background: #66a6ff;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
          }
          a:hover { background: #558de8; }
        </style>
      </head>
      <body>
        <h1>${emoji} Hello, ${name}! Nice to see you! ${emoji}</h1>
        <a href="/">Back</a>
      </body>
    </html>
  `);
});

module.exports = router;
