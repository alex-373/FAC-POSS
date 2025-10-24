// backend/models/index.js
import sequelize from "../config/database.js";

// Importa cada modelo
import ProductModel from "./Product.js";
import SupplierModel from "./Supplier.js";
import CustomerModel from "./Customer.js";
import SaleModel from "./Sale.js";
import SaleDetailModel from "./SaleDetail.js";
import PaymentModel from "./Payment.js";
import UserModel from "./User.js"; // ✅ NUEVO

// Instancia los modelos
const Product = ProductModel(sequelize);
const Supplier = SupplierModel(sequelize);
const Customer = CustomerModel(sequelize);
const Sale = SaleModel(sequelize);
const SaleDetail = SaleDetailModel(sequelize);
const Payment = PaymentModel(sequelize);
const User = UserModel(sequelize); // ✅ NUEVO

// Asociaciones existentes...
Customer.hasMany(Sale, {
  foreignKey: { name: "customerId", allowNull: false },
  as: "sales",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Sale.belongsTo(Customer, {
  foreignKey: { name: "customerId", allowNull: false },
  as: "customer",
});

Sale.hasMany(SaleDetail, {
  foreignKey: { name: "saleId", allowNull: false },
  as: "details",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
SaleDetail.belongsTo(Sale, {
  foreignKey: { name: "saleId", allowNull: false },
  as: "sale",
});

Product.hasMany(SaleDetail, {
  foreignKey: { name: "productId", allowNull: false },
  as: "saleDetails",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
SaleDetail.belongsTo(Product, {
  foreignKey: { name: "productId", allowNull: false },
  as: "product",
});

Supplier.hasMany(Product, {
  foreignKey: { name: "supplier_id", allowNull: false },
  as: "products",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});
Product.belongsTo(Supplier, {
  foreignKey: { name: "supplier_id", allowNull: false },
  as: "supplier",
});

Sale.hasMany(Payment, {
  foreignKey: { name: "saleId", allowNull: false },
  as: "payments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Payment.belongsTo(Sale, {
  foreignKey: { name: "saleId", allowNull: false },
  as: "sale",
});

// Exportaciones
export {
  sequelize,
  Product,
  Supplier,
  Customer,
  Sale,
  SaleDetail,
  Payment,
  User, // ✅ NUEVO
};

export default {
  sequelize,
  Product,
  Supplier,
  Customer,
  Sale,
  SaleDetail,
  Payment,
  User, // ✅ NUEVO
};