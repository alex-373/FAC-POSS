// backend/models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Importa los modelos. Es una buena práctica usar un solo formato de importación.
// Se asume que estos archivos solo exportan la función de definición.
const Product = require('./Product')(sequelize, DataTypes);
const Supplier = require('./Supplier')(sequelize, DataTypes);
const Customer = require('./Customer')(sequelize, DataTypes);
const Sale = require('./Sale')(sequelize, DataTypes);
const SaleDetail = require('./SaleDetail')(sequelize, DataTypes);
const Payment = require("./Payment")(sequelize, DataTypes);

// Crea un objeto para mantener todos los modelos y la conexión
const db = {};
db.sequelize = sequelize;
db.Product = Product;
db.Supplier = Supplier;
db.Customer = Customer;
db.Sale = Sale;
db.SaleDetail = SaleDetail;

// Definir las asociaciones aquí, después de que todos los modelos han sido importados
// Un cliente puede tener muchas ventas
db.Customer.hasMany(db.Sale, { foreignKey: "customerId" });
db.Sale.belongsTo(db.Customer, { foreignKey: "customerId" });

// Una venta tiene muchos detalles
db.Sale.hasMany(db.SaleDetail, { foreignKey: "saleId" });
db.SaleDetail.belongsTo(db.Sale, { foreignKey: "saleId" });

// Un producto puede estar en muchos detalles
db.Product.hasMany(db.SaleDetail, { foreignKey: "productId" });
db.SaleDetail.belongsTo(db.Product, { foreignKey: "productId" });

// Lado Product -> Supplier (aseguramos la inversa)
db.Product.belongsTo(db.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });


// Relaciones
Sale.belongsTo(Customer, { foreignKey: "customerId" });
Sale.hasMany(SaleDetail, { foreignKey: "saleId" });
Sale.hasMany(Payment, { foreignKey: "saleId" });

SaleDetail.belongsTo(Sale, { foreignKey: "saleId" });
SaleDetail.belongsTo(Product, { foreignKey: "productId" });

Payment.belongsTo(Sale, { foreignKey: "saleId" });


module.exports = db;