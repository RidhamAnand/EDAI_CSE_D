export const haversineDistance = (coords1, coords2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const lat1 = toRadians(coords1[0]);
  const lon1 = toRadians(coords1[1]);
  const lat2 = toRadians(coords2[0]);
  const lon2 = toRadians(coords2[1]);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};
