import RestaurantService from "./RestaurantService";

class RestaurantController {
  constructor() {}

  static async _createRestaurant(req, res) {
    const { body: payload } = req;

    const data = await RestaurantService._createRestaurant(payload);
    res.send(data);
  }

  static async _getRestaurants(req, res) {
    const data = await RestaurantService._getRestaurants();
    res.send(data);
  }
}

export default RestaurantController;
