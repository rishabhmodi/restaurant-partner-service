import { DataTypes } from "sequelize";

const RestaurantModel = (sequelize) => {
  const Restaurant = sequelize.define(
    "restaurant",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      cuisine: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return Restaurant;
};

export default RestaurantModel;
