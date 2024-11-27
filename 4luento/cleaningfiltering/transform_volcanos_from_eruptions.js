const myObjectParser = require('./read_csv_file_to_objects.js')
const duplicateRemover = require('./removeDuplicateObjects.js')

//Tämä vaatii, että olet ladannut koko repositoryn.
const filewriter = require('../../1luento/fakedatagenerator/generate_books_json.js')


const volcanoEruptions = myObjectParser.parseCSVtoJSONSync("./data/volcano-events_apache2.csv")

console.log(`Purkauksia ${volcanoEruptions.length}`)

const volcanos = volcanoEruptions.map(eruption=> transformEruptionToVolcano(eruption))
//Järjestää listan nimen mukaan
volcanos.sort((a, b) => a.name.localeCompare(b.name));
const uniqueVolcanos = duplicateRemover.removeDuplicates(volcanos)
console.log(uniqueVolcanos)
filewriter.saveTextToFile(JSON.stringify(uniqueVolcanos), 'volcanos.json')



function transformEruptionToVolcano(eruption){
    let { name, location, country, latitude, longitude, elevation, type } = eruption;
    let volcano = { name, location, country, latitude, longitude, type }
    volcano.elevationCategory=categorizeElevation(elevation)
    volcano.latitude=parseFloat(volcano.latitude)
    volcano.longitude=parseFloat(volcano.longitude)
    //console.log(typeof(volcano.elevation))
    return volcano;
}

function categorizeElevation(elevation){
    const e = parseInt(elevation)
    if (isNaN(e)){
        return "Unknown"
    }
    if (e<500){
        return 1
    }
    else if (e<3000){
        return 2
    }
    else {
        return 3
    }
}



