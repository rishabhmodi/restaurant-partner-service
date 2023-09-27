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
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "created",
          "restaurant_acceppted",
          "delivery_partner_assigned",
          "order_picked_up",
          "delivered"
        ),
        defaultValue: "created",
      },
      currency: {
        type: DataTypes.ENUM("rupees", "dollar"),
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
