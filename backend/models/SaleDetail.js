// backend/models/SaleDetail.js
module.exports = (sequelize, DataTypes) => {
  const SaleDetail = sequelize.define("SaleDetail", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: "sale_details",
    timestamps: true
  });

  return SaleDetail;
};
