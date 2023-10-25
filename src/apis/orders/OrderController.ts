import OrderService from "./OrderService";

class OrderController {
  constructor() {}

  static async _createOrder(payload) {
    const data = await OrderService._createOrder(payload);
  }

  static async _getActiveOrders(req, res) {
    const data = await OrderService._getActiveOrders();
    res.send(data);
  }
}

export default OrderController;
