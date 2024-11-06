const customers = require('./customers.json')

function convertCustomerToCSVText(customer){
    return customer.firstName+";"+customer.lastName+";"+customer.birthDate
}

const customerCSVRowList = customers.map(customer=>convertCustomerToCSVText(customer))
const customersCSVText = customerCSVRowList.join("\n")

console.log(customersCSVText)