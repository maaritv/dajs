const volcanosAsString = `[{"name":"Mount Etna","location":{"country":"Italy","coordinates":{"latitude":37.751,"longitude":14.9934}},"heightMeters":3326,"isActive":true,"lastEruption":"2023-02-16"},{"name":"Mount Fuji","location":{"country":"Japan","coordinates":{"latitude":35.3606,"longitude":138.7274}},"heightMeters":3776,"isActive":false,"lastEruption":"1707-12-16"}]`

const volcanoList = JSON.parse(volcanosAsString)

console.log(`Volcano lista pituus on ${volcanoList.length}`)

const firstVolcanoName = volcanoList[1].name;
console.log(`Eka tulivuori on ${firstVolcanoName}`)