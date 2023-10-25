import { DataTypes } from "sequelize";

const OrderModel = (sequelize) => {
  const Orders = sequelize.define(
    "orders",
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
        allowNull: false,
      },
      delivery_partner_id: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM(
          "created",
          "restaurant_accepted",
          "restaurant_rejected",
          "delivery_partner_assigned",
          "order_picked_up",
          "delivered",
          "undelivered"
        ),
        defaultValue: "created",
      },
      currency: {
        type: DataTypes.ENUM("INR", "DOLLAR"),
      },
      total_amount: {
        type: DataTypes.FLOAT,
      },
      placed_order_latitude: {
        type: DataTypes.FLOAT,
      },
      placed_order_longitude: {
        type: DataTypes.FLOAT,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  return Orders;
};

export default OrderModel;
