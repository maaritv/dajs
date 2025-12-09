const volcanoes = [
    {
        name: "Mount Fuji",
        latitude: 35.3606,
        longitude: 138.7274,
        elevation_m: 3776
    },
    {
        name: "Mauna Loa",
        latitude: 19.475,
        longitude: -155.608,
        elevation_m: 4169
    },
    {
        name: "Mount Etna",
        latitude: 37.7510,
        longitude: 14.9934,
        elevation_m: 3329
    }
];

const geocodedLocations = [
    {
        latitude: 35.3606,
        longitude: 138.7274,
        country: "Japan",
        place: "Shizuoka Prefecture"
    },
    {
        latitude: 19.475,
        longitude: -155.608,
        country: "United States",
        place: "Hawaii"
    },
    {
        latitude: 37.7510,
        longitude: 14.9934,
        country: "Italy",
        place: "Sicily"
    }
];

/**
 * Tulivuoren kohdistaminen lokaatiotietoihin latituden ja longituden 
 * kautta on todellisuudessa todella hidasta, koska jokainen maailman 
 * latitude-longitude yhdistelmä pitäisi testata. Tässä auttaisi hieman
 * jos ne olisivat järjestettynä datasetissä.  
 * 
 * @param {*} volcano 
 * @param {*} location 
 * @returns 
 */


function isRightLocationForVolcano(volcano, location) {
    if (volcano.latitude==location.latitude && volcano.longitude==location.longitude){
        return true
    }
    return false
}

function joinVolcanoWithLocationAndAddCountryName(volcano, geocodedLocations) {
    const locationForVolcano = geocodedLocations.find(location => isRightLocationForVolcano(volcano, location))
    console.log(locationForVolcano)
    return { ...volcano, country: locationForVolcano.country }
}

function enrichVolcanosWithCountry(volcanoes, geocodedLocations) {
    const volcanosWithName = volcanoes.map(volcano => joinVolcanoWithLocationAndAddCountryName(volcano, geocodedLocations))
    console.log(volcanosWithName)
    return volcanosWithName
}

const volcanosWithNames = enrichVolcanosWithCountry(volcanoes, geocodedLocations)
console.log(volcanosWithNames)


