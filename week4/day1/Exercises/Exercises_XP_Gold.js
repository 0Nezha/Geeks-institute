//Exercise 1 : Nested functions
let landscape = function() {

 let result = "";

 let flat = function(x) {
   for(let count = 0; count<x; count++){
     result = result + "_";
   }
 }

 let mountain = function(x) {
   result = result + "/"
   for(let counter = 0; counter<x; counter++){
     result = result + "'"
   }
   result = result + "\\"
 }

 flat(4);
 mountain(4);
 flat(4)

 return result;
}

landscape();
//1:
//outcome: "____/''''\\____"
//flat(x) ajoute 4 fois _
//mountain(x) ajoute / + ' 4 fois + \\ et à la fin flat ajoute 4 fois _

//2:
const landscape = () => {

  let result = "";
  const flat = x => {
    for (let count = 0; count < x; count++) {
      result += "_";
    }
  };

  const mountain = x => {
    result += "/";
    for (let counter = 0; counter < x; counter++) {
      result += "'";
    }
    result =result + "\\";
  };

  flat(4);
  mountain(4);
  flat(4);

  return result;
};

landscape();



//Exercise 2 : Closure
const addTo = x => y => x + y;
const addToTen = addTo(10);
addToTen(3);
//This defines a curried function. The function addTo takes a parameter x and returns another function that takes a parameter y. The inner function then returns the sum of x + y
//output: 13



//Exercise 3 : Currying
const curriedSum = (a) => (b) => a + b
curriedSum(30)(1)
//This defines a curried function. The function addTo takes a parameter "a" and returns another function that takes a parameter "b". The inner function then returns the sum of "a + b"
//output: 31


//Exercise 4 : Currying
const curriedSum = (a) => (b) => a + b
const add5 = curriedSum(5)
add5(12)
//output: 17

//Exercise 5 : Composing
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5 = (num) => num + 5;
compose(add1, add5)(10)
//output: 16
//add1(add5(10))
//add5 = 10 + 5 = 15
//add1 = 15 + 1 = 16