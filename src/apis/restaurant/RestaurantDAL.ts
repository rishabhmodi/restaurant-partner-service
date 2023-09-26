import dbModels from "../../models";

class RestaurantDAL {
  static restaurantModel = dbModels.restaurant;

  static async _createRestaurant(payload) {
    return await this.restaurantModel.create(payload);
  }

  static async _getRestaurants() {
    return await this.restaurantModel.findAll();
  }
}

export default RestaurantDAL;
