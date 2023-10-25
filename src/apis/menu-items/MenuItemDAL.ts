import dbModels from "../../models";

class MenuItemDAL {
  static menuItemModel = dbModels.menuItems;

  static async _createMenuItem(payload) {
    return await this.menuItemModel.create(payload);
  }

  static async _getRestaurants() {
    return await this.menuItemModel.findAll();
  }

  static async _getMenuItemById(id) {
    return await this.menuItemModel.findOne({ where: { id } });
  }
}

export default MenuItemDAL;
