const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  barcode: { type: DataTypes.STRING, unique: true },
  sku: { type: DataTypes.STRING, unique: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  unit: { type: DataTypes.STRING, defaultValue: 'unidades' },
  unit_cost: { type: DataTypes.FLOAT, allowNull: false },
  total_cost: { 
    type: DataTypes.VIRTUAL,
    get() { return this.unit_cost * this.quantity; }
  },
  sale_price: { type: DataTypes.FLOAT },
  purchase_date: { type: DataTypes.DATE },
  expiry_date: { type: DataTypes.DATE },
  supplier_id: { type: DataTypes.INTEGER }
}, {
  hooks: {
    beforeSave: (product) => {
      if (product.quantity < 0) throw new Error("Stock no puede ser negativo");
    }
  }
});

module.exports = Product;