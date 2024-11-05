const { faker } = require('@faker-js/faker');
const customergenerator = require('./generate_books_json')

//asenna: npm install @faker-js/faker
//Dokumentaatio: https://fakerjs.dev/

// Function to generate a random Customer object
const generateCustomerWithId = (id) => {
    return {
        id: id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.number.int({min: 1930, max: 2021})+"-0"+faker.number.int({min: 1, max: 6})+"-"+faker.number.int({min: 10, max: 28}),
        tel: faker.phone.number(),
        address: faker.location.streetAddress(),
        zip: faker.location.zipCode(),
        city: faker.location.city(),
        country: faker.location.country()
    };
};

// Generate an array of 20 Customers
const customers = Array.from({ length: 20 }, (_, index) => generateCustomerWithId(index + 1));
//Tulostetaan Customers OBJEKTILISTAN objektit
console.log(customers)
console.log(typeof customers)


// Muunnetaan lista kirja OBJEKTEJA JSON TEKSTIKSI
//ja tulostetaan se:
const customersJSON = JSON.stringify(customers);
console.log(customersJSON);
console.log(typeof(customersJSON));

//Tiedostoon talletetaan TEKSTIÄ
customergenerator.saveTextToFile(customersJSON, "customers.json")


