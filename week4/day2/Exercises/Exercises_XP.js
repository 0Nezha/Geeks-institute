// Exercise 1 : Colors:
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

//1:
for (let i = 0; i < colors.length; i++) {
  console.log(`${i + 1}# choice is ${colors[i]}.`);
}
//2:
if (colors.some(color => color === "Violet")) {
  console.log("Yeah");
} else {
  console.log("No...");
}

//Exercise 2 : Colors #2
const colors1 = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];

//1:
colors1.forEach((color, i) => {
  const number = i + 1;
  const suffixes = 
    number === 1 ? "st" :
    number === 2 ? "nd" :
    number === 3 ? "rd" : "th";
  console.log(`${number}${suffixes} choice is ${color}`);
});

//Exercise 3 : Analyzing
//------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
//output: [ 'bread', 'carrot', 'potato', 'chicken', 'apple', 'orange' ]

//------2------
const country = "USA";
console.log([...country]);
//...country spreads each character of the string into an array.
//output:"USA" becomes [ 'U', 'S', 'A' ]

//------Bonus------
let newArray = [...[,,]];
console.log(newArray);
//output: [ undefined, undefined ]
//Spreading it with ... will preserve the holes, but in a new array, they become undefined, because [,,] is an array with 2 empty slots (holes).

// Exercise 4 : Employees
const users = [{ firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
             { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
             { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
             { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
             { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
             { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
             { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}];

//1:
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);
//2:
const FullStackResidents = users.filter(user => user.role === "Full Stack Resident");
console.log(FullStackResidents);
//3:
const FullStackLName = users
.filter(user => user.role === "Full Stack Resident")
.map(user => user.lastName);
console.log(FullStackLName);

//Exercise 5 : Star Wars
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];
const combine = epic.reduce((acc, word) => acc + " " + word, "");
console.log(combine);

//Exercise 6 : Employees #2
const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
               {name: "Liam", course: "Computer Science", isPassed: false}, 
               {name: "Jenner", course: "Information Technology", isPassed: true}, 
               {name: "Marco", course: "Robotics", isPassed: true}, 
               {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
               {name: "Jamie", course: "Big Data", isPassed: false}];
//1:
const studentspassedscore = students.filter(student => student.isPassed === true);
console.log(studentspassedscore);
//2:
students.filter(student => student.isPassed).forEach(student => {
    console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
  });
