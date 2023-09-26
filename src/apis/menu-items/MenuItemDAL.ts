import dbModels from "../../models";

class MenuItemDAL {
  static menuItemModel = dbModels.menuItems;

  static async _createMenuItem(payload) {
    return await this.menuItemModel.create(payload);
  }

  static async _getRestaurants() {
    return await this.menuItemModel.findAll();
  }
}

export default MenuItemDAL;
