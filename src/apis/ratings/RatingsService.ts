import CoreUtil from "../../providers/CoreUtil";
import RatingsDAL from "./RatingsDAL";

class RatingsService {
  static async _createRatings(payload) {
    try {
      Object.assign(payload, { id: CoreUtil._generateUUID() });
      return await RatingsDAL._createRatings(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _getRatings() {
    try {
      return await RatingsDAL._getRatings();
    } catch (error) {
      console.log(error);
    }
  }
}

export default RatingsService;
