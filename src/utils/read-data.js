const fs = require('fs');

const readFile = file => {
  if (!file) {
    throw new Error('No file provided');
  }
  try {
    const rawData = fs.readFileSync(file);
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error);
  }
  return [];
};

module.exports = readFile;
