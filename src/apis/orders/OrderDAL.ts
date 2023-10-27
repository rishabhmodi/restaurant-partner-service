import dbModels from "../../models";

class OrderDAL {
  static orderModel = dbModels.orders;

  static async _createOrder(payload) {
    return await this.orderModel.create(payload);
  }

  static async _getActiveOrders() {
    return await this.orderModel.findAll();
  }

  static async _getActiveOrderById(id) {
    return await this.orderModel.findOne({ where: { id } });
  }

  static async _updateDeliveryPartnerInActiveOrder(orderId, deliveryPartnerId) {
    return await this.orderModel.update(
      {
        delivery_partner_id: deliveryPartnerId,
        status: "delivery_partner_assigned",
      },
      {
        where: { id: orderId },
      }
    );
  }

  static async _updateOrderStatus(orderId, status) {
    return await this.orderModel.update(
      {
        status,
      },
      {
        where: { id: orderId },
      }
    );
  }

  static async _markOrderAsDelivered(orderId) {
    return await this.orderModel.update(
      {
        status: "delivered",
        isActive: false,
      },
      {
        where: { id: orderId },
      }
    );
  }
}

export default OrderDAL;
