import { DataTypes } from 'sequelize';

const ProductModel = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      barcode: { type: DataTypes.STRING, allowNull: false, unique: true },
      sku: { type: DataTypes.STRING, allowNull: false, unique: true },
      quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
      unit: { type: DataTypes.STRING },
      unit_cost: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      sale_price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      purchase_date: { type: DataTypes.DATE },
      expiry_date: { type: DataTypes.DATE },
      supplier_id: {
        type: DataTypes.INTEGER,
        references: { model: 'suppliers', key: 'id' },
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: 'products',
      underscored: true,
      timestamps: true,
    }
  );

  return Product;
};

export default ProductModel;