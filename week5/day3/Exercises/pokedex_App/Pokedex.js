const pokemonImgContainer = document.querySelector(".info-container");
const randomButton = document.getElementById("circle-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentPokemonId = 1;

// Fonction pour afficher le Pokémon
async function fetchPokemon(id) {
  try {
    pokemonImgContainer.innerHTML = `<p>Loading...</p>`;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    displayPokemon(data);
    currentPokemonId = data.id;
  } catch (error) {
    pokemonImgContainer.innerHTML = `<p>Oh no! That Pokémon isn’t available…</p>`;
  }
}

// afficher les infos dans le pokedex
function displayPokemon(pokemon) {
  const name = pokemon.name.toUpperCase();
  const id = `${pokemon.id.toString().padStart(3, "0")}`;
  const height = (pokemon.height / 10).toFixed(1);
  const weight = (pokemon.weight / 10).toFixed(1);
  const type = pokemon.types.map(t => t.type.name).join(", ");

  pokemonImgContainer.innerHTML = `
    <img id="pokedex" src="${pokemon.sprites.front_default}" alt="${name}">
    <h1 id="pokemon-name">${name}</h1>
    <p id="pokemon-id"> Pokemon n°${id}</p>
    <p id="pokemon-height">Height: ${height} m</p>
    <p id="pokemon-weight">Weight: ${weight} kg</p>
    <p id="pokemon-type">Type: ${type}</p>
  `;
}

// Bouton Random
randomButton.addEventListener("click", () => {
  const randomId = Math.floor(Math.random() * 898) + 1;
  fetchPokemon(randomId);
});

// Bouton previous
prevButton.addEventListener("click", () => {
  if (currentPokemonId > 1) {
    fetchPokemon(currentPokemonId - 1);
  }
});

// Bouton next
nextButton.addEventListener("click", () => {
  fetchPokemon(currentPokemonId + 1);
});

