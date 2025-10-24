// backend/models/SaleDetail.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const SaleDetail = sequelize.define(
    "SaleDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sale_id",
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "sale_details",
      timestamps: true,
      underscored: true, // si usas snake_case en columnas
    }
  );

  return SaleDetail;
};