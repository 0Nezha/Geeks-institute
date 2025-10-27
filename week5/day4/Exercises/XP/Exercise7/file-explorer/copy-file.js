const fs = require("fs");


fs.readFile("source.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading source file:", err);
    return;
  }

  fs.writeFile("destination.txt", data, "utf8", (err) => {
    if (err) {
      console.error("Error writing to destination file:", err);
      return;
    }
    console.log("File copied successfully from source.txt to destination.txt");
  });
});