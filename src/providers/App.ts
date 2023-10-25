import * as dotenv from "dotenv";
import * as path from "path";

import Express from "./Express";
import { Database } from "./Database";
import KafkaProducer from "./KafkaProducer";
import KafkaConsumer from "./KafkaConsumer";

class App {
  public loadConfiguration(): void {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
  }

  public loadServer(): void {
    Express.init();
  }

  public loadDatabase(): void {
    Database.init();
  }

  public loadKafka(): void {
    new KafkaProducer();
    new KafkaConsumer("order-stream");
  }
}

export default new App();
