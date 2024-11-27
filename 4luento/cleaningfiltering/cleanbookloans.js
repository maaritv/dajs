const myObjectParser = require('./read_csv_file_to_objects.js')

const myBookLoans = myObjectParser.parseCSVtoJSONSync('./bookloans.csv')
const validBookLoans = cleanBookLoans(myBookLoans)
console.log(`Valideja kirjalainoja ${validBookLoans.length}`)
//console.log(validBookLoans)

function cleanBookLoans(bookloans){
    console.log(`Kirjalainoja ${bookloans.length}`)
    const myValidBookLoans = bookloans.filter(bookloan=> isValidBookLoan(bookloan))
    return myValidBookLoans
}

function isValidBookLoan(bookloan) {
     // Varmistetaan, että päivämäärät ovat kelvollisia ja palautuspäivä on lainapäivän jälkeen
    if (bookloan.returndate && bookloan.loandate) {

       if (parseDate(bookloan.returndate) > parseDate(bookloan.loandate)) {
            return true;
        }
    }
    return false;
}

function parseDate(dateString){
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // day = 0 -> huom.
    //console.log(date); 
    return date
}

module.exports = { parseDate, cleanBookLoans };


