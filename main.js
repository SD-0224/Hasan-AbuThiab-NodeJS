const fs = require("fs");
const { readFile } = require("fs/promises");

//Function for counting characters in given filecontent
function countWords(str) {
  //Split the words based on whitespaces/tabs/newlines
  let words = str.split(/\s+/);
  //Filter out special characters and remove empty words
  let filtered = words
    .map((word) => word.replace(/[^a-zA-Z]/g, ""))
    .filter((word) => word.length > 0);
  return filtered.length;
}

// Read given file
async function readThisFile(filePath) {
  try {
    const data = await readFile(filePath);
    //Checks if file is empty
    if (data.toString().trim()==='')
    {
        console.log(`${filePath}: 0 word, empty file`);
        return;
    }
    //Count words call
    const wordCount = countWords(data.toString());
    console.log(`${filePath}: ${wordCount} words`);
  } catch (error) {
    //Handles if file does not exist (Error no entry)
    if (error.code === 'ENOENT') {
        console.error(`${filePath}: File does not exist`);
    } else {
        console.error(`Error reading or processing file ${filePath}: ${error.message}`);
    }
  }
}
//Read and Parse json config
async function readConfigFile(configFilePath) {
  try {
    const configData = await readFile(configFilePath);
    const config = JSON.parse(configData);
    //Checks if Files format exists
    if (!Array.isArray(config.files))
      throw new Error("Invalid config, Files format not found");
    //Loop through the files "array" and pass path to read function
    for (const file of config.files) {
      await readThisFile(file);
    }
  } 
  catch (error) {
    //Handles if file does not exist
    if(error.code === 'ENOENT')
    {
        console.error(`File ${configFilePath} not found`);
    }
    else
    {
        console.error(`Error reading or processing file ${configFilePath}: ${error.message}`);
    }
    
  }
}
//Pass config path!
readConfigFile("./config.json");

