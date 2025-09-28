// Exercise 1:

// Part I - Review about arrays
// 1:
const people = ["Greg", "Mary", "Devon", "James"];

const index = people.indexOf("Greg");
if (index !== -1) {
  people.splice(index, 1);
}
console.log(people);
// sinon on peut faire people.shift() si on veut enlever le premier élément

//2:
const index2 = people.indexOf("James");
if (index2 !== -1) {
  people[index2] = "Jason";
}
console.log(people);

//3:
people.push("Nezha");
console.log(people);

//4: 
const index3 = people.indexOf("Mary");
console.log(index3);

//5:
console.log(people.slice(1, 3));

//6:
const index4 = people.indexOf("Foo");
console.log(index4);
// returns -1 because "Foo" is not in the array

//7:
const last = people[people.length - 1];
console.log(last);

//Part II - Loops
//1:
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

//2:
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}
//Exercise 2 : Your favorite colors
//1
const colors = ["black", "blue", "red", "brown", "green" ];

//2:
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

//3:
const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

//Exercise 3 :  Repeat the question
//1:
const prompt = require("prompt-sync")();

let input = prompt("Enter a number:");
console.log(typeof input); // Affiche "string" car prompt retourne toujours une chaîne
let number = Number(input);
if (isNaN(number)) {
  console.log("That's not a valid number!");
} else {
  console.log("You entered the number:", number);
}

//2:
  input = prompt("Enter a number:");
  number = Number(input);
while( isNaN(number) || number < 10) {
  if (isNaN(number)) {
    console.log("That's not a valid number! Please enter again.");
  } else {
    console.log("Number too small, try again.");
  }
  input = prompt("Enter a number:");
  number = Number(input);

}
console.log(`Perfect! You entered ${number}.`);

// Exercise 4 : Building Management

//1:
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}
//2:
console.log("Number of floors:", building.numberOfFloors);

//3:
console.log("Apartments on 1st floor:", building.numberOfAptByFloor.firstFloor);
console.log("Apartments on 3rd floor:", building.numberOfAptByFloor.thirdFloor);

//4:
console.log("Name of the second tenant:", building.nameOfTenants[1]);
console.log("Number of rooms in Dan's apartment:", building.numberOfRoomsAndRent.dan[0]);

//5:
if (building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1] > building.numberOfRoomsAndRent.dan[1]) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's rent increased to:", building.numberOfRoomsAndRent.dan[1]);
}

//Exercise 5 : Family
//1:
const family = {
  father: "Omar",
  mother: "Zahra",
  son: "Saad",
  daughter: "Salma"
};

//2:
console.log("Keys of the family object:");
for (let key in family) {
  console.log(key);
}

//3:
console.log("Values of the family object:");
for (let key in family) {
  console.log(family[key]);
}

//Exercise 6 : Rudolf
//1:
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}
//
let message = "";
for (let key in details) {
  message +=  key + " " + details[key] + " ";
}
console.log(message);

//Exercise 7 : Secret Group
//1:
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

let firstLetter = [];
for (let i = 0; i < names.length; i++) {
  firstLetter.push(names[i][0]);
}

console.log(firstLetter.sort());
//2:
console.log(firstLetter.join(""));