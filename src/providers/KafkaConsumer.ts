import { Consumer, KafkaClient, Message } from "kafka-node";
import OrderController from "../apis/orders/OrderController";

class KafkaConsumer {
  private consumer: Consumer;

  constructor(topic: string) {
    const client = new KafkaClient({ kafkaHost: "localhost:9092" });
    this.consumer = new Consumer(client, [{ topic }], { autoCommit: true });

    this.consumer.on("message", (message: Message) => {
      try {
        const parsedMessage = JSON.parse(message.value as string);
        const { status } = parsedMessage;
        if (status === "CREATE_ORDER") {
          OrderController._createOrder(parsedMessage);
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
