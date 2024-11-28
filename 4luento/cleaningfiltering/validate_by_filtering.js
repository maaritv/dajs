/**
 * Suodattaa listasta validit tulivuoret.
 * @param {Array} volcanos - Lista tulivuorista.
 * @returns {Array} - Lista validoituja tulivuoria.
 */
function getValidVolcanos(volcanos) {
    return volcanos.filter(volcano => validateVolcano(volcano));
}

//Palauttaa true, jos tulivuoren attribuutit ovat kunnossa:
//korkeus, viimeisin purkausvuosi, nimi ja maa on annettu.
//Lisäksi vuoden pitää olla suurempi kuin 1700 ja korkeuden yli 2000 m
function validateVolcano(volcano){
    if (volcano.height && volcano.height>2000 &&
        volcano.latest_eruption_year && volcano.latest_eruption_year>1700 && 
        volcano.name &&
        volcano.country){
            return true
        }
        return false
}

// Koodin suoritus alkaa tästä
const volcanoList = [
    { name: "Mount Fuji", height: 3776, latest_eruption_year: 1707, country: "Japan" },
    { name: "Eyjafjallajökull", height: 1651, latest_eruption_year: 2010, country: "Iceland" },
    { name: "Unknown Volcano", height: null, latest_eruption_year: 1900, country: "Unknown" },
    { name: "Mauna Loa", height: 4169, latest_eruption_year: 1984, country: "USA" },
    { name: "", height: 3000, latest_eruption_year: null, country: "Unknown" },
];

const validVolcanos = getValidVolcanos(volcanoList);
console.log(validVolcanos);
