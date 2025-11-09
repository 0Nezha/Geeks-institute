const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Chemin vers le fichier JSON
const gameFilePath = path.join(__dirname, "data", "gameState.json");

// Lire l’état du jeu
function readGameState() {
  const data = fs.readFileSync(gameFilePath, "utf-8");
  return JSON.parse(data);
}

// Écrire l’état du jeu
function writeGameState(state) {
  fs.writeFileSync(gameFilePath, JSON.stringify(state, null, 2));
}

// Obtenir l’état actuel du jeu
app.get("/game", (req, res) => {
  const gameState = readGameState();
  res.json(gameState);
});

// Recommencer une nouvelle partie
app.post("/reset", (req, res) => {
  const newGame = {
    gridSize: 10,
    players: {
      player1: { x: 0, y: 0, base: { x: 0, y: 0 } },
      player2: { x: 9, y: 9, base: { x: 9, y: 9 } }
    },
    turn: "player1",
    winner: null
  };
  writeGameState(newGame);
  res.json({ message: "Nouvelle partie démarrée !", gameState: newGame });
});

// Faire un mouvement
app.post("/move", (req, res) => {
  let gameState = readGameState();
  const { player, direction } = req.body;

  if (player !== gameState.turn)
    return res.status(400).json({ message: "Ce n’est pas ton tour !" });

  const p = gameState.players[player];
  const move = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
  }[direction];

  if (!move) return res.status(400).json({ message: "Direction invalide !" });

  const newX = p.x + move[0];
  const newY = p.y + move[1];

  if (newX < 0 || newY < 0 || newX >= gameState.gridSize || newY >= gameState.gridSize)
    return res.status(400).json({ message: "Mouvement hors limite !" });

  // Mettre à jour la position
  p.x = newX;
  p.y = newY;

  // Vérifier la victoire
  const opponent = player === "player1" ? "player2" : "player1";
  const base = gameState.players[opponent].base;

  if (p.x === base.x && p.y === base.y) {
    gameState.winner = player;
    writeGameState(gameState);
    return res.json({ message: `${player} a gagné !`, gameState });
  }

  // Changer de tour
  gameState.turn = opponent;
  writeGameState(gameState);

  res.json({ message: "Mouvement effectué !", gameState });
});

app.listen(PORT, () =>
  console.log(`🎮 Serveur en ligne sur http://localhost:${PORT}`)
);
