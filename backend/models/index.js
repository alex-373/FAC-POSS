// backend/models/index.js
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = require('../config/database'); // Importa tu conexión configurada

const db = {};

// Cargar todos los modelos automáticamente
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file !== 'index.js' &&
      file.slice(-3) === '.js' &&
      !file.startsWith('.')
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configurar relaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;