function degreesToRadians(degrees) {
  // Convert degrees to radians
  return (degrees * Math.PI) / 180;
}

function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers

  // Calculate the differences in latitude and longitude, converted to radians
  const latitudeDifferenceRadians = degreesToRadians(lat2 - lat1);
  const longitudeDifferenceRadians = degreesToRadians(lon2 - lon1);

  // Convert latitudes to radians
  const latitude1Radians = degreesToRadians(lat1);
  const latitude2Radians = degreesToRadians(lat2);

  // Haversine formula
  const haversineA =
    Math.sin(latitudeDifferenceRadians / 2) *
      Math.sin(latitudeDifferenceRadians / 2) +
    Math.sin(longitudeDifferenceRadians / 2) *
      Math.sin(longitudeDifferenceRadians / 2) *
      Math.cos(latitude1Radians) *
      Math.cos(latitude2Radians);

  // Central angle using arctangent and 2-argument arctangent function
  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversineA), Math.sqrt(1 - haversineA));

  // Calculate the great-circle distance
  const distance = EARTH_RADIUS_KM * centralAngle;

  return distance; // Distance in kilometers
}

export function sortPlacesByDistanceFromReference(
  places,
  referenceLat,
  referenceLon
) {
  // Clone the array to avoid modifying the original
  const sortedPlaces = [...places];

  sortedPlaces.sort((firstPlace, secondPlace) => {
    // Calculate distances from the reference point to each place
    const distanceToFirstPlace = calculateHaversineDistance(
      referenceLat,
      referenceLon,
      firstPlace.lat,
      firstPlace.lon
    );
    const distanceToSecondPlace = calculateHaversineDistance(
      referenceLat,
      referenceLon,
      secondPlace.lat,
      secondPlace.lon
    );

    // Sort places based on distances in ascending order
    return distanceToFirstPlace - distanceToSecondPlace;
  });

  return sortedPlaces;
}
