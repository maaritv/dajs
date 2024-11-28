const fs = require('fs');

function createObjectFromRow(row, delimiter, headers){
    const values = row.split(delimiter);
    const jsonObject = {};

    // Map headers to values
    headers.forEach((header, index) => {
        jsonObject[header.toLowerCase()] = values[index];
    });

    return jsonObject
}

function parseCSVtoJSONSync(filePath, delimiter = ';') {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.trim().split('\n');
        
        const headers = lines[0].split(delimiter);
        const jsonData = [];

        lines.shift()
        const listOfObjects = lines.map(line=>createObjectFromRow(line, delimiter, headers))
        return listOfObjects;
    } catch (error) {
        console.error('Error parsing CSV:', error);
        throw error;
    }
}

// Koodin suoritus alkaa tästä
const csvFilePath = './bookloans.csv';
try {
    const parsedData = parseCSVtoJSONSync(csvFilePath);
    console.log('Parsed JSON:', parsedData);
} catch (err) {
    console.error('Failed to parse CSV:', err);
}

module.exports = {  parseCSVtoJSONSync }
