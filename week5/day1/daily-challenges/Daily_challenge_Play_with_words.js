//1st daily challenge:
//1- Function 1: makeAllCaps
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    if (words.every(word => typeof word === "string")) {
      const uppercased = words.map(word => word.toUpperCase());
      resolve(uppercased);
    } else {
      reject("Error:  Not all items are strings");
    }
  });
}

//2- Function 2: sortWords
function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve(words.sort());
    } else {
      reject("Error: Array length must be bigger than 4");
    }
  });
}

// ---------------- TEST CASES ----------------

// Example 1: contains a number -> should reject
makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// Example 2: not enough items -> should reject
makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// Example 3: valid case -> should resolve with sorted array
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result)) // ["APPLE","BANANA","KIWI","MELON","PEAR"]
  .catch(error => console.log(error));

//le cas 3 a déjà fini son travail avec succès, donc son console.log(...) sort avant que l’erreur du cas 2 soit affichée.
//Cas 3 va plus vite → son succès est loggé avant que le cas 2 plante. L’ordre des logs dépend du temps d’exécution.


//2nd daily challenge:
const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`
//2-  Function 1: toJs
function toJs(morse) {
  return new Promise((resolve, reject) => {
    const morseJSO = JSON.parse(morse);

    if (Object.keys(morseJSO).length === 0) {
      reject("Error: Morse object is empty");
    } else {
      resolve(morseJSO);
    }
  });
}

//3-  Function 2: toMorse

function toMorse(morseJSO) {
  return new Promise((resolve, reject) => {
    const user = prompt("Enter a word or sentence").toLowerCase();
    const translation = [];
    for (let char of user) {
      if (morseJSO[char]) {
        translation.push(morseJSO[char]);
      } else {
        reject(`Character "${char}" doesn't exist in the morse javascript object`);
        return;
      }
    }
    resolve(translation);
  });
}

//4-  Function 3: joinWords
function joinWords(morseTranslation) {
  return new Promise((resolve) => {
    const joined = morseTranslation.join("\n");
    document.body.innerText = joined; // Affichage dans le DOM
    resolve();
  });
}

// ---------------- TEST CASE ----------------
toJs(morse)
  .then(toMorse)
  .then(joinWords)
  .catch(err => console.error(err));