const customers = require('./customers.json')

console.log(`Number of customers ${customers.length}`)

//Poistaa listasta vain ne rivit, joissa objektin 
//kaikki attribuutit ovat samat kuin jollain toisella
//listan objektilla. 

function removeDuplicateCustomers(customers) {
    const customerset = new Set()
    customers.forEach(customer => {
        customerset.add(JSON.stringify(customer))
    });
    const uniqueCustomers = []
    customerset.forEach(customerstr => {
        uniqueCustomers.push(JSON.parse(customerstr))
    })
    return uniqueCustomers
}

// Usage
const uniqueCustomers = removeDuplicateCustomers(customers);

console.log(uniqueCustomers)
console.log(`Number of unique customers ${uniqueCustomers.length}`)
