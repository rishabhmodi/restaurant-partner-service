import dbModels from "../models";

export class Database {
  public static init(): any {
    dbModels.sequelize
      .sync({ force: true })
      .then(() => {
        console.log("Db Synced...");
      })
      .catch((err) => {
        console.log("Failed to Db Sync...", err);
      });
  }
}

export default Database;
