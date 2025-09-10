function mergeWords(string) {
  return function(nextString) {
    if (nextString === undefined) {
      return string;
    } else {
      return mergeWords(string + ' ' + nextString);
    }
  }
}
const mergeWords = (string) => (nextString) =>
  nextString === undefined
    ? string
    : mergeWords(`${string} ${nextString}`);

// Example usage:
console.log(mergeWords("Hello")()); // "Hello"
console.log(mergeWords("There")("is")("no")("spoon.")()); //

