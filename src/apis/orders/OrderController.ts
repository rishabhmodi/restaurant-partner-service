import OrderService from "./OrderService";

class OrderController {
  constructor() {}

  static async _createOrder(payload) {
    return await OrderService._createOrder(payload);
  }

  static async _getActiveOrders(req, res) {
    const data = await OrderService._getActiveOrders();
    res.send(data);
  }

  static async _assignDeliveryPartner(orderId, deliveryPartnerId) {
    return await OrderService._updateDeliveryPartnerInActiveOrder(
      orderId,
      deliveryPartnerId
    );
  }

  static async _updateOrderStatus(orderId, status) {
    return await OrderService._updateOrderStatus(orderId, status);
  }

  static async _markOrderAsDelivered(orderId) {
    return await OrderService._markOrderAsDelivered(orderId);
  }
}

export default OrderController;
