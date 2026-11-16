const { faker } = require('@faker-js/faker');
const utils = require("./utils.js")

//asenna: npm install @faker-js/faker
//Dokumentaatio: https://fakerjs.dev/

// Function to generate a random book object

function generateBookWithId(id) {
    return {
        id: id,
        title: faker.book.title(),
        series: faker.book.series(),
        genre: faker.book.genre(),
        format: faker.book.format(),
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        publisher: faker.book.publisher(),
        publishYear: faker.number.int({ min: 1800, max: 2022 }),
        price: faker.number.float({ min: 10.00, max: 120.00 }).toFixed(2),
    };
}

// Generate an array of 20 books
const books = Array.from({ length: 20 }, (_, index) => generateBookWithId(index + 1));

//Tulostetaan books OBJEKTILISTAN objektit
console.log(books)
console.log(typeof books)

// Muunnetaan lista kirja OBJEKTEJA JSON TEKSTIKSI
//ja tulostetaan se:
const booksJSON = JSON.stringify(books);
console.log(booksJSON);
console.log(typeof (booksJSON));

//Tiedostoon talletetaan TEKSTIÄ
utils.saveTextToFile(booksJSON, "books.json")



