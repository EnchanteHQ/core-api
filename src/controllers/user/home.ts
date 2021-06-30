import { Request, Response } from "express";
import { InternalErrorResponse, SuccessResponse } from "../../core/ApiResponse";
import Event, { eventModel } from "../../db/models/Event";
import { userModel } from "../../db/models/User";
import constants from "../../constants";
import ifInRange from "../../helpers/ifEventInRange";

class HomeController {
  getHomePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { lat, lon } = req.query;
      const userId = req.user.id;
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
        const eventInRange = ifInRange(
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

      const tip: string =
        constants.tips[Math.floor(Math.random() * constants.tips.length)];

      new SuccessResponse("The home screen has been sent!", {
        eventsInRange,
        eventsBasedOnYourInterest,
        tip,
      }).send(res);
    } catch (error) {
      console.error(`Error sending event details:>> ${error}`);
      new InternalErrorResponse("Error sending event details!", {}).send(res);
    }
  };
}

export default HomeController;
