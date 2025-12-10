// Athlete object
const athlete = {
  name: "John Fast",
  sport: "100m sprint",
  clubAbbreviation: "HSC"
};

// Sports club object
const sportsClub = {
  abbreviation: "HSC",
  fullName: "Helsinki Sprint Club",
  country: "Finland"
};

// Matching function
function matchAthleteToClub(athlete, club) {
  if (athlete.clubAbbreviation === club.abbreviation) {
    return {
      ...athlete,
      clubInfo: club
    };
  } else {
    return athlete; // no match found
  }
}

const enrichedAthlete = matchAthleteToClub(athlete, sportsClub);

console.log(enrichedAthlete);
