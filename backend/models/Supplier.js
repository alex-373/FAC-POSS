// backend/models/Supplier.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // created_at y updated_at los maneja Sequelize con timestamps + underscored
    },
    {
      tableName: "suppliers",
      timestamps: true,
      underscored: true, // usa created_at y updated_at
    }
  );

  return Supplier;
};