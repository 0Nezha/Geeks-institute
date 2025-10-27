document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("player-name");
  const startGameBtn = document.getElementById("start-game");
  const gameContainer = document.querySelector(".game-container");
  const displayName = document.getElementById("display-name");
  const scoreDisplay = document.getElementById("score");
  const emojiDisplay = document.getElementById("emoji");
  const optionsContainer = document.getElementById("options-container");
  const guessForm = document.getElementById("guess-form");
  const feedbackDiv = document.getElementById("feedback");
  const nextEmojiBtn = document.getElementById("next-emoji");
  const leaderboardBody = document.getElementById("leaderboard-body");

  
  let currentEmoji = null;
  let score = 0;
  let playerName = "";
  let selectedOption = null;

  
  startGameBtn.addEventListener("click", startGame);
  guessForm.addEventListener("submit", handleGuess);
  nextEmojiBtn.addEventListener("click", getNewEmoji);

  
  loadLeaderboard();

  
  function startGame() {
    playerName = playerNameInput.value.trim();

    if (!playerName) {
      alert("Please enter your name to start the game.");
      return;
    }

    displayName.textContent = playerName;
    gameContainer.style.display = "block";

    getNewEmoji();
  }

  async function getNewEmoji() {
    try {
      const response = await fetch("http://localhost:4000/api/emoji");
      currentEmoji = await response.json();

      console.log(currentEmoji);

      
      emojiDisplay.textContent = currentEmoji.emoji;

      
      optionsContainer.innerHTML = "";
      feedbackDiv.textContent = "";
      feedbackDiv.className = "feedback";

      
      currentEmoji.options.forEach((option) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.textContent = option;
        optionElement.dataset.value = option;

        optionElement.addEventListener("click", () => {
          
          document.querySelectorAll(".option").forEach((opt) => {
            opt.classList.remove("selected");
          });

          
          optionElement.classList.add("selected");
          selectedOption = option;
        });

        optionsContainer.appendChild(optionElement);
      });

      
      nextEmojiBtn.style.display = "none";
      document.getElementById("submit-guess").disabled = false;
    } catch (error) {
      console.error("Error fetching emoji:", error);
    }
  }

  async function handleGuess(event) {
    event.preventDefault();

    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName,
          guess: selectedOption,
          correctAnswer: currentEmoji.correctAnswer,
        }),
      });

      const result = await response.json();

      
      feedbackDiv.textContent = result.message;
      feedbackDiv.className = `feedback ${
        result.isCorrect ? "correct" : "incorrect"
      }`;

      
      if (result.isCorrect) {
        score++;
        scoreDisplay.textContent = score;
      }

      
      nextEmojiBtn.style.display = "block";
      document.getElementById("submit-guess").disabled = true;

      
      loadLeaderboard();
    } catch (error) {
      console.error("Error submitting guess:", error);
    }
  }

  async function loadLeaderboard() {
    try {
      const response = await fetch("http://localhost:4000/api/leaderboard");
      const leaderboard = await response.json();

      leaderboardBody.innerHTML = "";

      if (leaderboard.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3" style="text-align: center">No scores yet</td>`;
        leaderboardBody.appendChild(row);
        return;
      }

      leaderboard.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${player.name}</td>
          <td>${player.score}</td>
        `;
        leaderboardBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    }
  }
});