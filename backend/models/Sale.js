// backend/models/Sale.js
import { DataTypes } from "sequelize";

const defineSale = (sequelize) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "customers",
          key: "id"
        }
      },
      status: {
        type: DataTypes.ENUM("borrador", "confirmada", "anulada"),
        defaultValue: "borrador"
      },
      type: {
        type: DataTypes.ENUM("contado", "credito"),
        allowNull: false,
        defaultValue: "contado"
      },
      discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      subtotal: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      taxes: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      total: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "sales",
      timestamps: true
    }
  );

  return Sale;
};

export default defineSale;