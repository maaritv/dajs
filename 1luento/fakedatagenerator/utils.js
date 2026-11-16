const fs = require('node:fs');

function saveTextToFile(text, fileName) {
    fs.writeFile(`./${fileName}`, text, err => {
        if (err) {
            throw (new Error("Tiedoston kirjoitus epäonnistui."))
        } 
    });
}

//Julkaisemme tallennusfunktion myös toisen 
//skriptin käyttöön, koska koodia ei saa 
//kopioida.
module.exports = { saveTextToFile }