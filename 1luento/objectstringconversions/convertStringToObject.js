const volcanoAsString = `{"name":"Mount Etna","location":{"country":"Italy","coordinates":{"latitude":37.751,"longitude":14.9934}},"heightMeters":3326,"isActive":true,"lastEruption":"2023-02-16"}`
const volcanoObject = JSON.parse(volcanoAsString)


console.log(`Tämä on tulivuori ${volcanoObject} objektimuodossa, huomaa ero.`)
console.log(`Tämä on tulivuori ${volcanoAsString} merkkijonomuodossa`)
console.log(`Jotta voit tallettaa datan tekstinä tai siirtää verkossa sen pitää olla merkkijonomuodossa`)

console.log(`Volcanoobject tyyppi ${typeof volcanoObject}`)
console.log(`Volcano as string tyyppi ${typeof volcanoAsString}`)