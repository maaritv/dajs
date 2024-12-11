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
        let data = fs.readFileSync(filePath, 'utf-8');
        data = data.replaceAll("\r","")
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

function createCSVFromJSON(jsObjectList) {
    if (!Array.isArray(jsObjectList) || jsObjectList.length === 0) {
        throw new Error("Input must be a non-empty array of objects.");
    }

    // Ota ensimmäisen objektin avaimet (sarakeotsikot)
    const headers = Object.keys(jsObjectList[0]);

    // Luo otsikkorivi ja lisää rivinvaihto
    const csvRows = [headers.join(",")];

    // Luo datarivit
    jsObjectList.forEach(obj => {
        const row = headers.map(header => {
            let value = obj[header].trim();
            value=value.replace("\r","")

            // Escapoi lainausmerkit ja erikoismerkit
            if (typeof value === "string") {
                return `"${value.replace(/"/g, '""')}"`; // CSV-standardi tuplaa lainausmerkit
            }
            return value ?? ""; // Käsittele null/undefined tyhjänä soluna
        });

        csvRows.push(row.join(","));
    });

    // Palauta CSV-muotoinen merkkijono
    return csvRows.join("\n");
}


function saveTextToFileDump(text, fileName){
    fs.writeFile('./'+fileName, text, err => {
        if (err) {
          console.error(err);
        } else {
            console.log("ok!")
        }
      });
}

function saveTextToFile(text, fileName) {
    const stream = fs.createWriteStream('./' + fileName);
    stream.write(text); // Kirjoitetaan data virtaan
    stream.end(); // Suljetaan virta

    stream.on('finish', () => {
        console.log("ok!");
    });

    stream.on('error', (err) => {
        console.error("Error writing to file:", err);
    });
}

function removeDuplicates(objects) {
    const objectset = new Set()
    objects.forEach(obj => {
        objectset.add(JSON.stringify(obj))
    });
    const uniqueObjects = []
    objectset.forEach(objectstr => {
        uniqueObjects.push(JSON.parse(objectstr))
    })
    return uniqueObjects
}

module.exports = {  parseCSVtoJSONSync, createCSVFromJSON, saveTextToFile, removeDuplicates }
