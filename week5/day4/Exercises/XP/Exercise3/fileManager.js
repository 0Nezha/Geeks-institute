const fs = require("fs");

exports.readFile = (filePath) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading file:", error);
      return;
    }
    console.log("File contents:", data);
  });
};

exports.writeFile = (filePath, content) => {
  fs.writeFile(filePath, content, "utf8", (error) => {
    if (error) {
      console.error("Error writing file:", error);
      return;
    }
    console.log("File written successfully.");
  });
};