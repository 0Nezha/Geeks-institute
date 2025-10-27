const fileManager = require('./fileManager');

fileManager.readFile("./HelloWorld.txt");
fileManager.writeFile("./ByeWorld.txt", "Writing to the file");
fileManager.readFile("./ByeWorld.txt");