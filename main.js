const fs = require("fs");
const { readFile } = require("fs/promises");

/**
 * Count the number of words in a given text, filtering out special characters.
 *
 * @param {string} text - The text to count words in.
 * @returns {number} The number of words in the text.
 **/
function countWords(str) {
  //Split the words based on whitespaces/tabs/newlines
  let words = str.split(/\s+/);
  //Filter out special characters and remove empty words
  let filtered = words
    .map((word) => word.replace(/[^a-zA-Z]/g, ""))
    .filter((word) => word.length > 0);
  return filtered.length;
}

/**
 * Read the file asynchronously through the given filepath, call the count function and display result
 * @param {string} filepath - The path to the file to read
 * @returns {Promise<void>} Promise resolved
 * */
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

/**
 * Read the file asynchronously through the given filepath, parse JSON data and call readThis async function for each
 * @param {string} configFilePath - The path to the file to read
 * @returns {Promise<void>} Promise resolved
 * */
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

