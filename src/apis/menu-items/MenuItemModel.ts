import { DataTypes } from "sequelize";

const MenuItemModel = (sequelize) => {
  const MenuItems = sequelize.define(
    "menuItems",
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
      name: {
        type: DataTypes.STRING,
      },
      currency: {
        type: DataTypes.ENUM("INR", "DOLLAR"),
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  return MenuItems;
};

export default MenuItemModel;
