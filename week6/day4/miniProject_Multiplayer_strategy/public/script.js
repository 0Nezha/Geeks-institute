let currentPlayer = "player1";

async function getGameState() {
  const res = await fetch("/game");
  return await res.json();
}

async function move(direction) {
  const res = await fetch("/move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player: currentPlayer, direction }),
  });

  const data = await res.json();
  alert(data.message);
  renderBoard();
}

async function resetGame() {
  await fetch("/reset", { method: "POST" });
  renderBoard();
}

async function renderBoard() {
  const game = await getGameState();
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  document.getElementById("status").textContent =
    game.winner
      ? `🏆 ${game.winner} a gagné !`
      : `Tour actuel : ${game.turn}`;

  currentPlayer = game.turn;

  for (let y = 0; y < game.gridSize; y++) {
    for (let x = 0; x < game.gridSize; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Bases
      if (
        (x === game.players.player1.base.x &&
          y === game.players.player1.base.y) ||
        (x === game.players.player2.base.x &&
          y === game.players.player2.base.y)
      ) {
        cell.classList.add("base");
      }

      // Joueurs
      if (x === game.players.player1.x && y === game.players.player1.y) {
        cell.classList.add("player1");
      } else if (x === game.players.player2.x && y === game.players.player2.y) {
        cell.classList.add("player2");
      }

      grid.appendChild(cell);
    }
  }
}

renderBoard();
