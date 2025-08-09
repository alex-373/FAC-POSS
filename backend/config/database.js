// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('negocio_poss', 'alex', 'alex123', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a PostgreSQL exitosa'))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;