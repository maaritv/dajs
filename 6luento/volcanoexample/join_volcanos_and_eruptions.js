//1. Luetaan tulivuoret muistiin
const volcanos = require('./inputdata/volcanos.json')
const objectParser = require('./read_csv_file_to_objects')
const dateUtils = require('./dateUtils')

//2. luetaan purkaukset muistiin
const eruptions = objectParser.parseCSVtoJSONSync('./inputdata/eruptions.csv', ";")
const eruptionsAC = removeEruptionsBeforeYear(eruptions, 1000)
const transformedEruptions = transformEruptionDateFieldsToStandardDateAndAddDuration(eruptionsAC)

const volcanosAndEruptions = joinVolcanosAndEruptions(volcanos, transformedEruptions).filter(volcano => volcano.volcano_name)

volcanosAndEruptions.sort((a, b) => a.volcano_name.localeCompare(b.volcano_name));
console.log(volcanosAndEruptions)
objectParser.saveTextToFile(JSON.stringify(volcanosAndEruptions), './inputdata/volcanos_and_eruptions.json')


/**
 * Tehdään ohjelmallisesti ulkoliitos, jossa yhdistetään kaikki tulivuoret, kaikkiin kys.
 * tulivuoren purkauksiin. Käytetään ulkoliitosta, koska myöhemmin pitää voida tulivuoriin 
 * yhdistää myös järistyksiä vaikka tulivuori ei (vielä) olisi purkautunut!
 * Ulkoliitoksella tulostaulukkoon tulee myös ne tulivuoret, jotka eivät ole koskaan purkautuneet.
 */

function  joinVolcanosAndEruptions(volcanos, eruptions){
    //Jotta vältetään tulivuorilistan monta läpikäyntiä, luodaan map-rakenne, 
    //josta saadaan muistista purkaukseen liittyvä tulivuori vakioajassa.
    const volcanoMap = new Map(
        volcanos.map(volcano => [volcano.volcano_name, volcano])
    );

    const volcanosAndEruptions = eruptions.map(eruption=> innerJoinVolcanosAndEruptions(eruption, volcanoMap))
    return volcanosAndEruptions
}

/**
 * Palauttaa taulukon tulivuorenpurkauksista yhdistettynä oikeaan tulivuoreen nimen perusteella.
 * @param {} eruption 
 * @param {*} volcanos 
 * @returns 
 */

function innerJoinVolcanosAndEruptions(eruption, volcanoMap){
    const volcanoForEruption = volcanoMap.get(eruption.volcano_name)
    return {...volcanoForEruption, ...eruption}
}


function removeEruptionsBeforeYear(eruptions, before_year){

    function hasOccuredBefore(eruption){
        if (parseInt(eruption.start_year)==NaN || parseInt(eruption.start_year)<before_year || parseInt(eruption.start_month)==0 || parseInt(eruption.start_day==0) || parseInt(eruption.start_month)==NaN || parseInt(eruption.start_day)==NaN || parseInt(eruption.start_year)==NaN){
            return false
        }
        return true
    }

    return eruptions.filter(eruption=>hasOccuredBefore(eruption))
} 

function transformEruptionDateFieldsToStandardDateAndAddDuration(eruptions){
    //Muunnetaan purkausten erilliset pv kk vsi standardi pvm muotoon YYYY-MM-DD

    function transformDateInformation(eruption){
        const {volcano_name,eruption_number,eruption_category,area_of_activity,vei,evidence_method_dating,start_year,start_month,start_day,end_year,end_month,end_day,latitude,longitude}=eruption;
        const neweruption = {volcano_name,eruption_number,eruption_category,area_of_activity,vei,evidence_method_dating,latitude,longitude}
        neweruption.eruption_date = start_year+"-"+start_month+"-"+start_day
        if (parseInt(end_month)>0 && parseInt(end_day)>0){
            const endDateStr = end_year+"-"+end_month+"-"+end_day
            neweruption.eruption_end_date=endDateStr+""
            neweruption.eruption_durationDays = calculateDuration(neweruption.eruption_date, endDateStr)+""
        }
        else {
            //jos kestoa ei voi laskea laitetaan -1 
            neweruption.eruption_durationDays='-1'
        }
        return neweruption
    }

    function calculateDuration(startStr, endStr){
        const startDate = dateUtils.parseDate(startStr)
        const endDate = dateUtils.parseDate(endStr)
        //console.log(startDate+" // "+endDate)
        const durationInDays = (endDate.getTime()-startDate.getTime())/1000/60/60/24;
        return durationInDays
    }

    return eruptions.map(eruption=> transformDateInformation(eruption))
}



