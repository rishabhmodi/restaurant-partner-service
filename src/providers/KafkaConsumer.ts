import { Consumer, KafkaClient, Message } from "kafka-node";
import { OrderMachineService } from "../apis/orders/OrderMachine";
import OrderController from "../apis/orders/OrderController";

class KafkaConsumer {
  private consumer: Consumer;

  constructor(topic: string) {
    const client = new KafkaClient({ kafkaHost: "localhost:9092" });
    this.consumer = new Consumer(client, [{ topic, partition: 0, offset: 0 }], {
      autoCommit: true,
    });

    this.consumer.on("message", (message: Message) => {
      try {
        const parsedMessage = JSON.parse(message.value as string);
        const { orderStatus } = parsedMessage;
        switch (orderStatus) {
          case "CREATE_ORDER":
            OrderController._createOrder(parsedMessage);
            break;
          case "AWAITING_RESTAURANT":
            const kafkaPayload = {
              orderId: parsedMessage.dataValues.id,
            };
            OrderMachineService.send("restaurant_accepted", kafkaPayload);
            break;
          case "LIST_OF_AVAILABLE_PARTNERS":
            const { orderId, availableDeliveryPartnerId } = parsedMessage;
            if (availableDeliveryPartnerId) {
              OrderController._assignDeliveryPartner(
                orderId,
                availableDeliveryPartnerId
              );
              OrderMachineService.send("delivery_partner_assigned", {
                orderId,
                deliveryPartnerId: availableDeliveryPartnerId,
              });
            }
            break;
          case "ORDER_PICKED_UP":
            const { orderId: pickedUpOrderId } = parsedMessage;
            OrderController._updateOrderStatus(
              pickedUpOrderId,
              "order_picked_up"
            );
            OrderMachineService.send("order_picked_up", {
              orderId: pickedUpOrderId,
            });
            break;
          case "DELIVERED":
            const { orderId: deliveryOrderId } = parsedMessage;
            OrderController._updateOrderStatus(deliveryOrderId, "delivered");
            OrderController._markOrderAsDelivered(deliveryOrderId);
            OrderMachineService.send("delivered", {
              orderId: deliveryOrderId,
            });
            break;
        }
      } catch (err) {
        console.log("error parsing message", err);
      }
    });

    this.consumer.on("error", (err) => {
      console.error("Kafka consumer error:", err);
    });
  }
}

export default KafkaConsumer;
