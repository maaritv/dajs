const { faker } = require('@faker-js/faker');
const fs = require('node:fs');
const bookgenerator = require('./generate_books_json')

//asenna: npm install @faker-js/faker
//Dokumentaatio: https://fakerjs.dev/

// Kirjalaina on transaktiodataa, joka yhdistää 
//relaatiotietokannassa kirjat asiakkaisiin tiettynä ajankohtana.
//CSV-muoto on puolipisteellä (tai pilkulla erotettua dataa)
//tässä muodostetaan lainaustietuerivit CSV-tiedostoon.

function generateBookLoanAsCSV(loanid) {
    const bookLoan =  {
        loanId: loanid,
        bookId: faker.number.int({min: 0, max: 50}),
        customerId: faker.number.int({min: 1000, max: 2000}),
        loanDate: "2024-0"+faker.number.int({min: 1, max: 6})+"-"+faker.number.int({min: 10, max: 28}),
        returnedDate: "2024-0"+faker.number.int({min: 2, max: 7})+"-"+faker.number.int({min: 10, max: 28}),
    };
    return bookLoan.loanId+";"+bookLoan.bookId+";"+bookLoan.customerId+";"+bookLoan.loanDate+";"+bookLoan.returnedDate;
};

// Nimeä muuttujat/vakiot kuvaavasti, jotta tiedät, missä muodossa data niissä on
const booksCSVRowList = Array.from({ length: 100 }, (_, index) => generateBookLoanAsCSV(index + 1));

// Muunna lista CSV-merkkijonoksi käyttäen join-listfunktiota.
//Rivit yhdistetään merkkijonoksi rivivaihtomerkillä \n
const booksCSV = booksCSVRowList.join("\n")
bookgenerator.saveTextToFile(booksCSV, "bookloans.csv")
console.log(booksCSV);



