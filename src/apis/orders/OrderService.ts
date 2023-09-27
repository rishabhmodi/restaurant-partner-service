import CoreUtil from "../../providers/CoreUtil";
import OrderDAL from "./OrderDAL";

class OrderService {
  static async _createOrder(payload) {
    try {
      Object.assign(payload, { id: CoreUtil._generateUUID() });
      return await OrderDAL._createOrder(payload);
    } catch (error) {
      console.log(error);
    }
  }

  static async _getActiveOrders() {
    try {
      return await OrderDAL._getActiveOrders();
    } catch (error) {
      console.log(error);
    }
  }
}

export default OrderService;
