import MenuItemService from "./MenuItemService";

class MenuItemController {
  constructor() {}

  static async _createMenuItem(req, res) {
    const { body: payload } = req;

    if (!payload.restaurant_id) {
      return res
        .status(400)
        .send({ message: "Give the value for restaurant id" });
    }

    const data = await MenuItemService._createMenuItem(payload);
    res.send(data);
  }

  static async _getMenuItems(req, res) {
    const data = await MenuItemService._getMenuItems();
    res.send(data);
  }
}

export default MenuItemController;
