//using one loop:
console.log("Using one loop:");
let result = ""
for (let i = 0; i < 6; i++) {
    result += "*";
    console.log(result);
}


//using two nested for loops
console.log("Using two nested for loops:");
for (let i = 0; i < 6; i++) {
    let result2 = "";
  for (let j = 0; j <= i; j++) {
    result2 += "*";
  }
  console.log(result2);
}
