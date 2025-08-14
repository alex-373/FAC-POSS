/// backend/models/index.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product  = require('./Product')(sequelize, DataTypes);
const Supplier = require('./Supplier')(sequelize, DataTypes);

const db = { sequelize, Product, Supplier };

// Lado Supplier -> Product (si el modelo la define)
if (Supplier.associate) Supplier.associate(db);
// (Opcional) si algún otro modelo define associate, se invoca igual.
// if (Product.associate) Product.associate(db);

// Lado Product -> Supplier (aseguramos la inversa)
Product.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });

module.exports = db;
