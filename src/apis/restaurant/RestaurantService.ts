import CoreUtil from "../../providers/CoreUtil";
import RestaurantDAL from "./RestaurantDAL";

class RestaurantService {
  static async _createRestaurant(payload) {
    try {
      Object.assign(payload, { restaurant_id: CoreUtil._generateUUID() });
      return await RestaurantDAL._createRestaurant(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _getRestaurants() {
    try {
      return await RestaurantDAL._getRestaurants();
    } catch (error) {
      console.log(error);
    }
  }
}

export default RestaurantService;
