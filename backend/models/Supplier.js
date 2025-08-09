const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Supplier = sequelize.define('Supplier', {
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING },
  address: { type: DataTypes.TEXT }
});

// Relación: Un proveedor tiene muchos productos
Supplier.hasMany(require('./Product'));
module.exports = Supplier;