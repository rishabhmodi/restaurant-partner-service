import { Dialect, Sequelize } from "sequelize";
import RestaurantModel from "../apis/restaurant/RestaurantModel";

const dbConnection = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "restaurant_partner",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
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
  restaurant: RestaurantModel(sequelize, Sequelize),
};

export default db;