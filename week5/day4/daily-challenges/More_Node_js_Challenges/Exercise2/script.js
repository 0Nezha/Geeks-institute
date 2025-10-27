const readlineSync = require("readline-sync");
const data = require("./date.js");
const birthdate = readlineSync.question("Enter your birthdate (YYYY-MM-DD): ");
console.log(data.calculateMinutesLived(birthdate));