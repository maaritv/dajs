

// Haversine Distance in Node.js
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

// Example usage
const lat1 = 60.1695, lon1 = 24.9354; // Helsinki, Finland
const lat2 = 59.3293, lon2 = 18.0686; // Stockholm, Sweden
console.log(`Distance: ${haversine(lat1, lon1, lat2, lon2)} km`);
