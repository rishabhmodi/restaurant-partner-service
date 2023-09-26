import { Application } from "express";
import * as path from "path";
import * as dotenv from "dotenv";

class Locals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4040;
    const appSecret = process.env.APP_SECRET;

    const name = process.env.APP_NAME;
    const keywords = process.env.APP_KEYWORDS;
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME;
    const description = process.env.APP_DESCRIPTION;

    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const apiPrefix = process.env.API_PREFIX || "api";

    const host = process.env.HOST;
    const user = process.env.DBUSER;
    const dbPassword = process.env.PASSWORD;
    const db = process.env.DB;
    const dialect = process.env.dialect;
    const poolMax = Number(process.env.poolMax) || 5;
    const poolMin = Number(process.env.poolMin) || 0;
    const poolAcquire = Number(process.env.poolAcquire) || 30000;
    const poolIdle = Number(process.env.poolIdle) || 10000;

    return {
      appSecret,
      apiPrefix,
      company,
      copyright,
      description,
      isCORSEnabled,
      keywords,
      name,
      port,
      url,
      host,
      user,
      dbPassword,
      db,
      dialect,
      poolMax,
      poolMin,
      poolAcquire,
      poolIdle,
    };
  }

  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
