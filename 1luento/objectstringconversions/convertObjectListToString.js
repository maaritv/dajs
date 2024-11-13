

const volcanoObjectA = {
    name: "Mount Etna",
    location: {
        country: "Italy",
        coordinates: {
            latitude: 37.7510,
            longitude: 14.9934
        }
    },
    heightMeters: 3326,
    isActive: true,
    lastEruption: "2023-02-16"
}

const volcanoObjectB = {
    name: "Mount Fuji",
    location: {
        country: "Japan",
        coordinates: {
            latitude: 35.3606,
            longitude: 138.7274
        }
    },
    heightMeters: 3776,
    isActive: false,
    lastEruption: "1707-12-16"
}

const volcanoList = []
//Listaan lisätään tulivuoret objekteina
volcanoList.push(volcanoObjectA)
volcanoList.push(volcanoObjectB)
const volcanosAsString = JSON.stringify(volcanoList)

console.log(`Tämä on tulivuorilista ${volcanoList} objektimuodossa, huomaa ero.\n`)
console.log(`Tämä on tulivuori ${volcanosAsString} merkkijonomuodossa`)
console.log(`Jotta voit tallettaa datan tekstinä tai siirtää verkossa sen pitää olla merkkijonomuodossa`)
console.log(`Volcano list tyyppi ${typeof volcanoList}`)
console.log(`Volcanos as string tyyppi ${typeof volcanosAsString}`)