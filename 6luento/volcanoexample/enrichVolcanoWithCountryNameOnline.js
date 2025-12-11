

/**
 * Enriches a volcano object with country and place name using reverse geocoding.
 * @param {Object} volcano
 * @param {number} volcano.latitude
 * @param {number} volcano.longitude
 * @returns {Promise<Object>}
 */

/** 
 * volcano: epä tarkempi (kts rivi 38)
 *   latitude: 19.475,
     longitude: -155.608,
 * 
 * location: tarkempi paikka
    lat: '19.6273325',
    lon: '-155.5645610',
 */
async function getLocation(latitude, longitude) {

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

    const response = await fetch(url, {
        headers: { "User-Agent": "Volcano-Geo-Enricher/1.0" }
    });
    const data = await response.json();
    console.log(data)
    return data
}

async function enrichVolcanoWithCountryName(volcano) {
    if (!volcano || !volcano.latitude || !volcano.longitude) {
        throw (new Error("Tulivuorta tai sen sijaintia ei määritelty, ei voida etsiä lokaatioita!"))
    }
    const location = await getLocation(volcano.latitude, volcano.longitude)
    if (location && location.address && location.address.country && location.lat && location.long && 
        location.lat.toString().includes(volcano.latitude) && location.long.toString().includes(volcano.longitude)
    ) {
        volcano.country = location.address.country
    }
    return volcano
}

// Esimerkki käyttö:
(async () => {
    const maunaLoa = {
        name: "Mauna Loa",
        latitude: 19.475,
        longitude: -155.608,
        elevation_m: 4169
    };

    const enriched = await enrichVolcanoWithCountryName(maunaLoa);
    console.log(enriched);
})();
