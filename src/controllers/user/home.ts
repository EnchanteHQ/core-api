import { Request, Response } from "express";
import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import Event, { eventModel } from "../../db/models/Event";
import { userModel } from "../../db/models/User";

class HomeController {
  ifInRange = (
    userLat: string,
    userLon: string,
    eventLat: string,
    eventLon: string
  ): boolean => {
    const userLatInt = parseFloat(userLat);
    const userLonInt = parseFloat(userLon);
    const eventLatInt = parseFloat(eventLat);
    const eventLonInt = parseFloat(eventLon);

    const latlonToMetersConversion = 111139;

    const distInMeters: number =
      latlonToMetersConversion *
      Math.sqrt(
        (eventLatInt - userLatInt) ** 2 + (eventLonInt - userLonInt) ** 2
      );
    if (distInMeters <= 20000) return true;
    return false;
  };

  getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { lat, lon } = req.query;
      const { userId } = req.body;
      const eventsInRange: Array<{ event: Event; availableSeats: number }> = [];
      const eventsBasedOnYourInterest: Array<{
        event: Event;
        availableSeats: number;
      }> = [];
      const allEvents: Array<Event> = await eventModel.find();
      const user = await userModel.findById(userId);

      allEvents.forEach((event) => {
        const eventCoordinates: { lat: string; lon: string } =
          event.location.coordinates;
        const eventInRange = this.ifInRange(
          lat.toString(),
          lon.toString(),
          eventCoordinates.lat,
          eventCoordinates.lon
        );
        if (eventInRange) {
          let availableSeats = 0;
          event.passes.forEach((pass) => {
            availableSeats += pass.availableNumber;
          });
          eventsInRange.push({ event, availableSeats });
        }
      });

      allEvents.forEach((event) => {
        const itMatched = event.tags.some((tag) =>
          user.interestedIn.includes(tag)
        );
        if (itMatched) {
          let availableSeats = 0;
          event.passes.forEach((pass) => {
            availableSeats += pass.availableNumber;
          });
          eventsBasedOnYourInterest.push({ event, availableSeats });
        }
      });
      new SuccessResponse("The home screen has been sent!", {
        eventsInRange,
        eventsBasedOnYourInterest,
      }).send(res);
    } catch (error) {
      console.log(`tbd:>> ${error}`);
      new InternalErrorResponse("Error sending event details!", {}).send(res);
    }
  };
}

export default HomeController;
