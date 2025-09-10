//Exercise 1 : Scope

// #1
function funcOne() {
    const a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// #1.1 - run in the console:  the value of a "3"
//a is initially 5. Since 5 > 1, the condition is true, so 'a' is reassigned to 3.
funcOne()
// #1.2 What will happen if the variable is declared with const instead of let ? 
// trying to do a = 3 inside the if block will throw a TypeError: Assignment to constant variable.


//#2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// #2.1 - run in the console:
funcThree() // the value of a "0"
funcTwo()  // modifies the outer 'a'. the value of a : 5, but with a message alert 
funcThree() //inside the funcThree function 5
// #2.2 What will happen if the variable is declared with const instead of let ?
//if 'a' is declared with const instead of let: const a = 0; funcTwo() will throw a TypeError: Assignment to constant variable, because const cannot be reassigned.


//#3
function funcFour() {
    window.a = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 - run in the console:
funcFour() // the value of a : "hello" 
funcFive() // the value of a : "hello"

//#4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}


// #4.1 - run in the console:
funcSix()// the value of a : "test" ; inside the funcSix function test. local variable 'a' inside funcSix shadows the outer 'a'.
// #4.2 What will happen if the variable is declared with const instead of let ?
//if 'a' is declared with const instead of let inside funcSix: const a = "test";
// It works fine because we are not reassigning 'a' inside the block. The alert still shows "test".

//#5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - run the code in the console 
//the value of a for alert1 in the if block : 5 and for alert2 outside of the if block : 2 
//let' inside the if block creates a new block-scoped variable, outer 'a' remains 2

// #5.2 What will happen if the variable is declared with const instead of let ?
//if 'a' is declared with const instead of let: const a = 5; inside the if block
// Works the same way because const is also block-scoped and not reassigned. Alert shows same values.



//Exercise 2 : Ternary operator
function winBattle(){
    return true;
}

//1: 
const winBattle = () => true;
//2..3:
let experiencePoints = winBattle() ? 10 : 1;
//4:
console.log(experiencePoints);



//Exercise 3 : Is it a string ?
const isString = (value) => typeof value === "string";

console.log(isString('hello')); //true
console.log(isString([1, 2, 4, 0])); //false
console.log(isString(2378)); //false
console.log(isString('monday')); //true 



//Exercise 4 : Find the sum
const sum = (num1, num2) => num1 + num2;
console.log(sum(18, 7));
console.log(sum(6, 9));



//Exercise 5 : Kg and grams
//1:
function kgToGramsdec(kg) {
    return kg * 1000;
}
console.log(kgToGramsdec(6));
//2:
const kgToGramsExpr = function(kg) {
    return kg * 1000;
};
console.log(kgToGramsExpr(7));
//3:Une function declaration est hoistée et peut être appelée avant d’être définie, tandis qu’une function expression ne l’est pas et doit être définie avant utilisation.
//4:
const kgToGramsArrow = kg => kg * 1000;
console.log(kgToGramsArrow(8)); 



//Exercise 6 : Fortune teller
//1:
(function(numchildren, partnername, location, job){
//2:
    const sentence = `You will be a ${job} in ${location}, and married to ${partnername} with ${numchildren} kids.`;
    const div = document.createElement("div");
    div.textContent = sentence;
    document.body.appendChild(div);
})(1, "gans", "Casa", "Software Engineer");



//Exercise 8 : Juice Bar
//Part I:
//1:
function makeJuice(size) {
    //2:
   function addIngredients (ingredient1, ingredient2, ingredient3){
     const sentence = `The client wants a ${size} juice, containing ${ingredient1}, ${ingredient2}, ${ingredient3}".`
       // Create a paragraph and append to the DOM
      const p = document.createElement('p');
        p.textContent = sentence;
        document.body.appendChild(p);
   }
   //3:
   addIngredients("apple", "banana", "orange");
  }
  makeJuice("small");

//Part II:
//1:
function makeJuice(size) {
    const ingredients = [];
//2:
    function addIngredients(ingredient1, ingredient2, ingredient3) {
        ingredients.push(ingredient1, ingredient2, ingredient3);
    }
//3:
    function displayJuice() {
        const sentence = `The client wants a ${size} juice, containing ${ingredients.join(', ')}.`;
        const p = document.createElement('p');
        p.textContent = sentence;
        document.body.appendChild(p);
    }
//4:
    addIngredients("apple", "banana", "orange");
    addIngredients("strawberry", "mango", "ananas");
    displayJuice();
}

makeJuice("large");
