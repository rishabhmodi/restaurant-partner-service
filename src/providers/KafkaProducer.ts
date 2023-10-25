import { Producer, KafkaClient, ProduceRequest } from "kafka-node";

class KafkaProducer {
  private producer: Producer;

  constructor() {
    const client = new KafkaClient({ kafkaHost: "localhost:9092" });
    this.producer = new Producer(client);

    this.producer.on("ready", () => {
      console.log("Kafka producer is ready");
    });

    this.producer.on("error", (err) => {
      console.error("Kafka producer error:", err);
    });
  }

  public produceMessage(topic: string, message: any): void {
    const payloads: ProduceRequest[] = [
      { topic, messages: JSON.stringify(message) },
    ];

    this.producer.send(payloads, (err, data) => {
      if (err) {
        console.error("Kafka producer error:", err);
      } else {
        console.log("Produced message:", data);
      }
    });
  }
}

export default KafkaProducer;
