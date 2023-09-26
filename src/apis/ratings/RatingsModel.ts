import { DataTypes } from "sequelize";

const RatingsModel = (sequelize) => {
  const Ratings = sequelize.define(
    "ratings",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      restaurant_id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      },
      review: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  return Ratings;
};

export default RatingsModel;
