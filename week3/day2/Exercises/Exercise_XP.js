// Exercise 1 : Find the numbers divisible by 23

//1..4:
function displayNumbersDivisible() {
let sum = 0;
    for (let i = 0; i <= 500; i++) {
        if (i % 23 === 0) {
            console.log(i);
            sum += i;
        }
    }
    console.log("the sum of all numbers divisible by 23 is: " + sum);
}
displayNumbersDivisible();

//5: bonus
function displayNumbersDivisible(divisor) {
let sum = 0;
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            console.log(i);
            sum += i;
        }
    }
    console.log("all the numbers divisible by " + divisor + " and their sum: " + sum);
}
displayNumbersDivisible(45);

//Exercise 2 : Shopping List
//1:
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 

//2:
const shoppingList = ["banana", "orange", "apple"];

//3.4.6:
function myBill() {
    let total = 0;
    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
             stock[item] -= 1; 
        }
    }
    return total;
}
//5: 

console.log("Total:", myBill());
console.log("Nouveau stock:", stock);

//Exercise 3 : What’s in my wallet?
//1..4:
function changeEnough(itemPrice, amountOfChange){
  const coinValues = [0.25, 0.10, 0.05, 0.01];
  let totalChange = 0;
  for (let i = 0; i < amountOfChange.length; i++) {
    totalChange += amountOfChange[i] * coinValues[i];
  }
   console.log("Total:", totalChange);
  return totalChange >= itemPrice;
}
console.log(changeEnough(4.25, [25, 20, 5, 0]));
console.log(changeEnough(14.11, [2,100,0,0]));

//Exercise 4 : Vacations Costs
//1:
const prompt = require("prompt-sync")();
function hotelCost() {
  let nights = prompt("How many nights would you like to stay in the hotel? ");
  nights = parseInt(nights);
  while (isNaN(nights) || nights <= 0) {
    nights = prompt("Please enter a valid number of nights:");
    nights = parseInt(nights);
  }
  return nights * 140;
}
console.log("Hotel cost:", hotelCost());

//2:
function planeRideCost() {  
    let destination = prompt("What's your destination? ");
    while (!isNaN(destination)) {
        destination = prompt("Please enter a valid destination:");
    }
    return destination === "London" ? 183 +"$" : destination === "Paris" ? 220 +"$" : 300 +"$";
}
console.log("Plane ride cost:", planeRideCost());

//3:
function rentalCarCost() {
    let days = prompt("How many days would you like to rent the car? ");
    days = parseInt(days);
    while (isNaN(days) || days <= 0) {
        days = prompt("Please enter a valid number of days:");
        days = parseInt(days);
    }
    let totalCost = days * 40;
    if (days > 10) {
        totalCost *= 0.95;
    }

  return totalCost;
}

//4: Total Vacation Cost
function totalVacationCost() {
    return hotelCost() + planeRideCost() + rentalCarCost();
}
console.log(`The car cost: $${rentalCarCost()}, the hotel cost: $${hotelCost()}, the plane tickets cost: $${planeRideCost()}.`);
console.log("Total vacation cost:", totalVacationCost());

//5:
//totalVacationCost();

//6:
// function totalVacationCost() {
//       let nights = parseInt(prompt("How many nights will you stay in the hotel?"));
//       let destination = prompt("What is your destination?");
//       let days = parseInt(prompt("How many days will you rent the car?"));
//     return hotelCost(nights) + planeRideCost(destination) + rentalCarCost(days);
// }
// console.log("Total vacation cost:", totalVacationCost());

//Exercise 5 : Users