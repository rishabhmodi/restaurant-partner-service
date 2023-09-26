import CoreUtil from "../../providers/CoreUtil";
import MenuItemDAL from "./MenuItemDAL";

class MenuItemService {
  static async _createMenuItem(payload) {
    try {
      Object.assign(payload, { id: CoreUtil._generateUUID() });
      return await MenuItemDAL._createMenuItem(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _getMenuItems() {
    try {
      return await MenuItemDAL._getRestaurants();
    } catch (error) {
      console.log(error);
    }
  }
}

export default MenuItemService;
