import fs from "fs";

const readFileex = function(filePath) {
    fs.readFile(filePath,"utf8",(err,data)=>{
        if(err){
            console.error("Error reading file:",err);
            return;
        }
        console.log("File content:",data);
    });
};
export default readFileex;