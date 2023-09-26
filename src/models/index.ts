import { Dialect, Sequelize } from "sequelize";
import RestaurantModel from "../apis/restaurant/RestaurantModel";
import MenuItemModel from "../apis/menu-items/MenuItemModel";
import RatingsModel from "../apis/ratings/RatingsModel";
import Locals from "../providers/Locals";

const config = Locals.config();

const dbConnection = {
  HOST: config.host,
  USER: config.user,
  PASSWORD: config.dbPassword,
  DB: config.db,
  dialect: config.dialect,
  pool: {
    max: config.poolMax,
    min: config.poolMin,
    acquire: config.poolAcquire,
    idle: config.poolIdle,
  },
};

const sequelize = new Sequelize(
  dbConnection.DB,
  dbConnection.USER,
  dbConnection.PASSWORD,
  {
    host: dbConnection.HOST,
    dialect: dbConnection.dialect as Dialect,
    pool: {
      max: dbConnection.pool.max,
      min: dbConnection.pool.min,
      acquire: dbConnection.pool.acquire,
      idle: dbConnection.pool.idle,
    },
  }
);

const db = {
  Sequelize,
  sequelize,
  restaurant: RestaurantModel(sequelize),
  menuItems: MenuItemModel(sequelize),
  ratings: RatingsModel(sequelize),
};

// Defined associations here
db.restaurant.hasMany(db.menuItems, {
  as: "menuitems",
  foreignKey: "restaurant_id",
});

db.restaurant.hasMany(db.ratings, {
  as: "ratings",
  foreignKey: "restaurant_id",
});

export default db;
