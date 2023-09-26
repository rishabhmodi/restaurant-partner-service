import { DataTypes } from "sequelize";

const MenuItemModel = (sequelize) => {
  const MenuItems = sequelize.define(
    "menuitems",
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
        type: DataTypes.ENUM("rupees", "dollar"),
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: true,
    }
  );

  return MenuItems;
};

export default MenuItemModel;
