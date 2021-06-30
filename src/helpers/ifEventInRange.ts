import constants from "../constants";

const ifInRange = (
  userLat: string,
  userLon: string,
  eventLat: string,
  eventLon: string
): boolean => {
  const userLatInt = parseFloat(userLat);
  const userLonInt = parseFloat(userLon);
  const eventLatInt = parseFloat(eventLat);
  const eventLonInt = parseFloat(eventLon);

  const distInMeters: number =
    constants.latlonToMetersConversion *
    Math.sqrt(
      (eventLatInt - userLatInt) ** 2 + (eventLonInt - userLonInt) ** 2
    );
  if (distInMeters <= constants.distanceLimitToFindEventsInMeters) return true;
  return false;
};

export default ifInRange;
