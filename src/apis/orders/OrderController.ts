import OrderService from "./OrderService";

class OrderController {
  constructor() {}

  static async _createOrder(req, res) {
    const { body: payload } = req;

    const data = await OrderService._createOrder(payload);
    res.send(data);
  }

  static async _getActiveOrders(req, res) {
    const data = await OrderService._getActiveOrders();
    res.send(data);
  }
}

export default OrderController;
