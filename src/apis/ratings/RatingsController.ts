import RatingsService from "./RatingsService";

class RatingsController {
  constructor() {}

  static async _createRatings(req, res) {
    const { body: payload } = req;

    const data = await RatingsService._createRatings(payload);
    res.send(data);
  }

  static async _getRatings(req, res) {
    const data = await RatingsService._getRatings();
    res.send(data);
  }
}

export default RatingsController;
