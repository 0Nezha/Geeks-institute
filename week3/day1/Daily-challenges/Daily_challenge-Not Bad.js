//1:
let sentence = "The movie is not that bad, I like it";

// //2:
let wordNot = sentence.indexOf("not");
console.log(wordNot);

//3:
let wordBad = sentence.indexOf("bad");
console.log(wordBad);

//4/5:
if ( wordBad !== -1 && wordNot !== -1 && wordBad > wordNot) {
    let nsentence = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3);
    console.log(nsentence);
} else {
    console.log(sentence);
}

//************************************:
let expsentence = "This dinner is bad !";
let wordNot1 = expsentence.indexOf("not");
console.log(wordNot1);
let wordBad1 = expsentence.indexOf("bad");
console.log(wordBad1);
if ( wordBad1 !== -1 && wordNot1 !== -1 && wordBad1 > wordNot1) {
    let nwsentence = expsentence.slice(0, wordNot1) + "good" + expsentence.slice(wordBad1 + 3);
    console.log(nwsentence);
} else {
    console.log(expsentence);
}
