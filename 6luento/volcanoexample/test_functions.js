
//const proximityUtils = require('./join_eruptions_and_earthquakes')
const dateUtils = require('./dateUtils')


function testCreateDate() {
    for (let year = 2020; year <= 2022; year++) {
        // Käydään läpi kaikki kuukaudet vuodessa
        for (let month = 1; month <= 12; month++) {
            // Käydään läpi kuukauden kaikki päivät
            const daysInMonth = new Date(year, month, 0).getDate(); // Hakee kuukauden viimeisen päivän
            for (let day = 1; day <= daysInMonth; day++) {
                // Luo päivämäärän ja lisää se testikokoelmaan
                dateUtils.createDate(year, month, day);
            }
        }
    }
}


const precedes = dateUtils.precedes('2019-08-25 09:46:15.018', '2019-11-1', 90)
console.log(precedes)

const diff = dateUtils.calculateTimeDiff('2020-01-03T11:10:50.052', '2019-11-1')
console.log(diff)
