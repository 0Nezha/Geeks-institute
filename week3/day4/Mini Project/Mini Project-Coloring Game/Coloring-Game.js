const grid = document.getElementById("grid");
const clearBtn = document.getElementById("clearBtn");
const colors = document.querySelectorAll(".color");

let isDrawing = false;
let selectedColor = "black";

// Sélection couleur
colors.forEach(color => {
  color.addEventListener("click", () => {
    selectedColor = color.style.background;
  });
});

// Création de la grille (1643 carrés)
for (let i = 0; i < 1643; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  // Début du dessin
  square.addEventListener("mousedown", () => {
    isDrawing = true;
    square.style.background = selectedColor;
  });

  // Continu du dessin
  square.addEventListener("mouseover", () => {
    if (isDrawing) {
      square.style.background = selectedColor;
    }
  });

  grid.appendChild(square);
}

// Stop dessin
document.addEventListener("mouseup", () => {
  isDrawing = false;
});

// Clear Button
clearBtn.addEventListener("click", () => {
  document.querySelectorAll(".square").forEach(square => {
    square.style.background = "white";
  });
});
