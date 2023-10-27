import CoreUtil from "../../providers/CoreUtil";
import MenuItemService from "../menu-items/MenuItemService";
import OrderDAL from "./OrderDAL";
import { OrderMachineService } from "./OrderMachine";

class OrderService {
  static async _createOrder(payload) {
    try {
      Object.assign(payload, { id: CoreUtil._generateUUID() });
      const menuItem = await MenuItemService._getMenuItemById(
        payload.menu_item_id
      );
      if (menuItem) {
        const { price, currency } = menuItem;
        Object.assign(payload, {
          total_amount: parseFloat(price),
          currency,
          placed_order_latitude: parseFloat(payload.placed_order_latitude),
          placed_order_longitude: parseFloat(payload.placed_order_longitude),
        });
        delete payload.status;
        const orderCreated = await OrderDAL._createOrder(payload);
        const kafkaPayload = {
          ...orderCreated,
          orderStatus: "AWAITING_RESTAURANT",
        };
        OrderMachineService.send("created", kafkaPayload);
        return orderCreated;
      }
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

  static async _getActiveOrderById(orderId) {
    try {
      return await OrderDAL._getActiveOrderById(orderId);
    } catch (error) {
      console.log(error);
    }
  }

  static async _updateDeliveryPartnerInActiveOrder(orderId, deliveryPartnerId) {
    try {
      return await OrderDAL._updateDeliveryPartnerInActiveOrder(
        orderId,
        deliveryPartnerId
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async _updateOrderStatus(orderId, status) {
    try {
      return await OrderDAL._updateOrderStatus(orderId, status);
    } catch (error) {
      console.log(error);
    }
  }

  static async _markOrderAsDelivered(orderId) {
    try {
      return await OrderDAL._markOrderAsDelivered(orderId);
    } catch (error) {
      console.log(error);
    }
  }
}

export default OrderService;
