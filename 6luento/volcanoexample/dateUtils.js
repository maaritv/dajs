
/**
 *  Päivämäärärakentaja käyttää omaa aikavyöhykettäsi oletuksena
    siksi lisätään Z eli tieto että on käytettävä UTC-aikaa
 * @param {dateString in YYYY-MM-DD format} dateString 
 * @returns date object
 */
function parseDateWithTime(dateTimeString) {
    //const dateString = "2022-09-01 04:57:05.290";
    //console.log("Date to be parsed: "+dateString)
    const parsedDate = new Date(dateTimeString.replace(" ", "T") + "Z");
    //console.log(parsedDate);
    return parsedDate
}

function parseDate(dateString){
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day); // day = 0 -> huom.
    //console.log(date); 
    return date
}

function createDate(year, month, day) {
    //console.log("\nDate to be parsed: " + year + "-" + month + "-" + day)
    const dte = new Date(
        parseInt(year),
        (parseInt(month) - 1 || 1),
        parseInt(day) || 1         // Päivän oletusarvo on 1, jos ei määritelty
    );
    //console.log(dte + "\n")
    return dte;
}

function calculateTimeDiff(firstDateTimeStr, laterDateStr){
    if (!firstDateTimeStr) {
        return false
    }

    const firstDate = parseDateWithTime(firstDateTimeStr)
    const secondDate = parseDate(laterDateStr);
 
    // Lasketaan aikaväli tulivuorenpurkauksen ja maanjäristyksen välillä
    const timeDifference = (secondDate.getTime() - firstDate.getTime())/1000/60/60/24;
    //console.log("first date "+firstDateTimeStr+" second date "+laterDateStr+" diff: "+timeDifference)
    return timeDifference
}

//earthquake happens first. it has timestamp
//eruption after that. it has datestr
function precedes(firstDateTimeStr, laterDateStr, maxTimeDifference) {
  const timeDifference = calculateTimeDiff(firstDateTimeStr, laterDateStr)
  if (timeDifference<0){
    return false
  }

    //console.log("debug!"+timeDifference+"/"+maxTimeDifference)

    // Palauta true vain jos maanjäristys tapahtui ennen purkausta ja aikaväli on enintään 60 päivää
    const precedes =  timeDifference <= maxTimeDifference;
    return precedes
}


module.exports = { parseDate, createDate, precedes, calculateTimeDiff }