const customers = require('./customers.json')

function convertCustomerToCSVText(customer){
    const csv=`${customer.firstName};${customer.lastName};${customer.birthDate}`
    return csv;
}

const customerCSVRowList = customers.map(customer=>convertCustomerToCSVText(customer))
const customersCSVText = customerCSVRowList.join("\n")

console.log(customersCSVText)