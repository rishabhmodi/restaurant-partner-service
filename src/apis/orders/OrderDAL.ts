import dbModels from "../../models";

class OrderDAL {
  static orderModel = dbModels.orders;

  static async _createOrder(payload) {
    return await this.orderModel.create(payload);
  }

  static async _getActiveOrders() {
    return await this.orderModel.findAll();
  }
}

export default OrderDAL;
