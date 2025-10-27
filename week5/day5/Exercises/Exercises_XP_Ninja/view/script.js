const submitButton = document.getElementById("submit");
const gameContainer = document.getElementById("game-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const submitButton2 = document.getElementById("submit2");
const resetButton = document.getElementById("reset");
const progressElement = document.getElementById("progress");
const resultElement = document.getElementById("result");

let selectedAnswer = null;

async function fetchState() {
  const res = await fetch("/api/quiz");
  if (!res.ok) throw new Error("Failed to load state");
  return res.json();
}

function renderState(state) {
  progressElement.textContent = state.completed
    ? `Completed. Final score: ${state.score}/${state.total}`
    : `Question ${state.index + 1} of ${state.total} • Score: ${state.score}`;

  if (state.completed) {
    questionElement.textContent = "";
    answersElement.innerHTML = "";
    submitButton2.disabled = true;
    return;
  }

  submitButton2.disabled = false;
  questionElement.textContent = state.question;
  answersElement.innerHTML = "";
  selectedAnswer = null;
  state.answers.forEach((answer, i) => {
    const label = document.createElement("label");
    label.className = "flex items-center gap-2 p-2 border rounded";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = String(i);
    input.addEventListener("change", () => {
      selectedAnswer = i;
    });
    const span = document.createElement("span");
    span.textContent = answer;
    label.appendChild(input);
    label.appendChild(span);
    answersElement.appendChild(label);
  });
}

async function startQuiz() {
  const state = await fetchState();
  gameContainer.classList.remove("hidden");
  submitButton.classList.add("hidden");
  renderState(state);
}

async function submitAnswer() {
  if (selectedAnswer === null) {
    resultElement.textContent = "Please choose an answer.";
    resultElement.className = "text-red-600";
    return;
  }
  const res = await fetch("/api/quiz/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer: selectedAnswer }),
  });
  const data = await res.json();
  resultElement.textContent = data.correct ? "Correct!" : "Incorrect";
  resultElement.className = data.correct ? "text-green-600" : "text-red-600";
  renderState(data);
}

async function resetQuiz() {
  const res = await fetch("/api/quiz/reset", { method: "POST" });
  const state = await res.json();
  resultElement.textContent = "";
  resultElement.className = "";
  renderState(state);
}

submitButton.addEventListener("click", startQuiz);
submitButton2.addEventListener("click", submitAnswer);
resetButton.addEventListener("click", resetQuiz);