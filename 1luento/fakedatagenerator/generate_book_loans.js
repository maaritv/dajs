const { faker } = require('@faker-js/faker');
const utils = require('./utils')

//asenna: npm install @faker-js/faker
//Dokumentaatio: https://fakerjs.dev/

// Kirjalaina on transaktiodataa, joka yhdistää 
//relaatiotietokannassa kirjat asiakkaisiin tiettynä ajankohtana.
//CSV-muoto on puolipisteellä (tai pilkulla erotettua dataa)
//tässä muodostetaan lainaustietuerivit CSV-tiedostoon.

function generateBookLoanAsCSV(loanid) {
    const loanId= loanid;
    const bookId=faker.number.int({min: 0, max: 50});
    const customerId=faker.number.int({min: 1000, max: 2000});
    const loanDate=`2024-0"${faker.number.int({min: 1, max: 6})}-${faker.number.int({min: 10, max: 28})}`;
    const returnedDate=`2024-${faker.number.int({min: 2, max: 7})}-${faker.number.int({min: 10, max: 28})}`;
    return `${loanId};${bookId};${customerId};${loanDate};${returnedDate}`;
};

// Nimeä muuttujat/vakiot kuvaavasti, jotta tiedät, missä muodossa data niissä on
const booksCSVRowList = Array.from({ length: 100 }, (_, index) => generateBookLoanAsCSV(index + 1));

// Muunna lista CSV-merkkijonoksi käyttäen join-listfunktiota.
//Rivit yhdistetään merkkijonoksi rivivaihtomerkillä \n
const booksCSV = booksCSVRowList.join("\n")
utils.saveTextToFile(booksCSV, "bookloans.csv")
console.log(booksCSV);



