import * as dotenv from "dotenv";
import * as path from "path";

import Express from "./Express";
import { Database } from "./Database";

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
}

export default new App();
