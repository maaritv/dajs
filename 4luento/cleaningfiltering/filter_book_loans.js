const myObjectParser = require('./read_csv_file_to_objects.js')
const myDateParser = require('./cleanbookloans.js')

const myBookLoans = myObjectParser.parseCSVtoJSONSync("./bookloans.csv")
const validBookLoans = myDateParser.cleanBookLoans(myBookLoans)

console.log(`Kirjalainoja tutkittavaksi ${validBookLoans.length}`)

const bookloans = validBookLoans.filter(bookloan=> bookloan.bookid=10 && myDateParser.parseDate(bookloan.loandate)>myDateParser.parseDate('2024-03-01') && myDateParser.parseDate(bookloan.loandate)<myDateParser.parseDate('2024-03-30'))
console.log(bookloans)
console.log(`Kiinnostavia kirjalainoja ${bookloans.length}`)

