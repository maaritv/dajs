const customers = require('./customers.json')

console.log(`Number of customers ${customers.length}`)

//Poistaa listasta vain ne rivit, joissa objektin 
//kaikki attribuutit ovat samat kuin jollain toisella
//listan objektilla. 

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


// Usage
const uniqueCustomers = removeDuplicates(customers);

console.log(uniqueCustomers)
console.log(`Number of unique customers ${uniqueCustomers.length}`)

module.exports = {removeDuplicates}