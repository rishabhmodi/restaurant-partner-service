import crypto from "crypto";

class CoreUtil {
  static _generateUUID() {
    return crypto.randomUUID();
  }
}

export default CoreUtil;
