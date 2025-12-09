/**
 * Liitetään tulivuorenpurkaukseen sen sijainnin ja ajankohdan perusteella 
 * maanjäristykset, jotka tapahtuvat alle 30 km säteellä ja vähemmän kuin 
 * 30 päivää ENNEN purkauksen ALKUA
 */
const objectParser = require('./read_csv_file_to_objects')
const dateUtils = require('./dateUtils')

console.log("Tulivuori-purkaukset")
const volcanosAndEruptions = require('./inputdata/volcanos_and_eruptions.json')
const volcanoEruptionsWithNumericCoordinates = transformCoordinates(volcanosAndEruptions)
//console.log(volcanoEruptionsWithNumericCoordinates)
console.log(`${volcanoEruptionsWithNumericCoordinates.length} purkausta.`)

console.log("Maanjäristykset")

const earthquakes = objectParser.parseCSVtoJSONSync('./inputdata/earthquakesall.csv')
const earthquakesPd = objectParser.parseCSVtoJSONSync('./inputdata/earthquakes_pd.csv')
const earthquakesPdA = objectParser.parseCSVtoJSONSync('./inputdata/earthquakesa_pd.csv')
//const earthquakesItaly = objectParser.parseCSVtoJSONSync('./inputdata/italyearthquakes.csv')

//earthquakes.push(...earthquakesItaly)
earthquakes.push(...earthquakesPd)
earthquakes.push(...earthquakesPdA)
console.log(`${earthquakes.length} maanjäristystä.`)
const earthquakesWithNumericCoordinates = transformEarthquakes(earthquakes)
//console.log(earthquakesWithNumericCoordinates)

const volcanoEruptionEarthQuakes = joinEarthquakeAndVolcanoEruptions(volcanoEruptionsWithNumericCoordinates, earthquakesWithNumericCoordinates)
//console.log(volcanoEruptionEarthQuakes)

const cleanedList = volcanoEruptionEarthQuakes.filter(volcanoEruptionEarthQuake => volcanoEruptionEarthQuake.eq_distanceKm > 0)
console.log(cleanedList.length + " items found")
const uniqueList = objectParser.removeDuplicates(cleanedList)
console.log(uniqueList.length + " unique items found")

objectParser.saveTextToFile(JSON.stringify(uniqueList), "outputdata/volcanoEruptionEarthquakes.json")

/**
 * Toteutusta voidaan keventää sillä, että jokainen maanjäristys voidaan liittää 
 * vain yhteen tulivuorenpurkaukseen. Ei siis tarvitse etsiä kaikkia tulivuorenpurkauksia
 * jotka ovat tapahtuneet lähistöllä samaan aikaan.
 * 
 * @param {} volcanosAndEruptions 
 * @param {*} earthquakes 
 */
function joinEarthquakeAndVolcanoEruptions(volcanoEruptions, earthquakes) {
    const volcanoEruptionEarthquakes = earthquakes.map(earthquake => mapRelatedVolcanoEruption(earthquake, volcanoEruptions))
    console.log("Tulivuori-purkaus-maanjäristykset")
    //console.log(volcanoEruptionEarthquakes)
    return volcanoEruptionEarthquakes
}


function isEarthquakeRelated(earthquake, volcanoEruption) {
    const distance = haversine(volcanoEruption.eruption_latitude, 
        volcanoEruption.eruption_longitude,
        earthquake.eq_latitude, earthquake.eq_longitude)

    if (distance < 100) {
        const p = dateUtils.precedes(earthquake.timestamp, volcanoEruption.eruption_date, 30)
        if (p) {
            return true;
        }
        return false
    }
    else {
        return false;
    }
}


function mapRelatedVolcanoEruption(earthquake, volcanoEruptions) {
    const relatedVolcanoEruptions = volcanoEruptions.filter(volcanoEruption => 
        isEarthquakeRelated(earthquake, volcanoEruption))

    if (relatedVolcanoEruptions.length==1) {
        //console.log("Palautetaan eka")
        const volcanoEruptionEq = { ...relatedVolcanoEruptions[0], ...earthquake }
        volcanoEruptionEq.eq_distanceKm = haversine(volcanoEruptionEq.eruption_latitude, 
            volcanoEruptionEq.eruption_longitude, 
            volcanoEruptionEq.eq_latitude, volcanoEruptionEq.eq_longitude)
        volcanoEruptionEq.daysBetweenEqAndEruption = dateUtils.calculateTimeDiffInDays(earthquake.timestamp, 
            relatedVolcanoEruptions[0].eruption_date)
        //console.log(volcanoEruptionEq)
        return volcanoEruptionEq
    }
    else if (relatedVolcanoEruptions.length>1){
        console.log(`many ${relatedVolcanoEruptions.length} volcanos erupting at the same time nearby??`)
        console.log(relatedVolcanoEruptions)
        return {}
    }
    else {
        return {}
    }
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radians

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance; // Returns the distance in kilometers
}


function transformCoordinates(eruptions) {

    function transformCoordinates(eruption) {
        const { eruption_date, eruption_end_date, volcano_name, eruption_number, eruption_category, area_of_activity, vei, evidence_method_dating, eruption_durationDays } = eruption;

        const neweruption = { eruption_date, eruption_end_date, volcano_name, eruption_number, eruption_category, area_of_activity, vei, evidence_method_dating, eruption_durationDays }

        neweruption.eruption_latitude = parseFloat(eruption.latitude)
        neweruption.eruption_longitude = parseFloat(eruption.longitude)
        return neweruption
    }

    return eruptions.map(eruption => transformCoordinates(eruption))
}

function transformEarthquakes(earthquakes) {

    function transformEarthquake(earthquake) {
        const { timestamp, latitude, longitude, description } = earthquake
        const newEarthquake = { timestamp, description }
        newEarthquake.eq_latitude = latitude
        newEarthquake.eq_longitude = longitude
        return newEarthquake
    }

    return earthquakes.map(earthquake => transformEarthquake(earthquake))
}


module.exports = { haversine }



