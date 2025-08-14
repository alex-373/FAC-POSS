// backend/app/app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('../config/database');
const productRoutes = require('../routes/productRoutes'); // Ruta corregida

const app = express();
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);

// Inicio
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Servidor: http://localhost:${PORT}`);
    console.log(`✅ BD: ${process.env.DB_NAME}`);
  });
});