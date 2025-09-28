// backend/app/app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('../config/database');
const productRoutes = require('../routes/productRoutes'); // Ruta corregida
const customerRoutes = require('../routes/customerRoutes');
const salesRoutes = require("../routes/salesRoutes");
const supplierRoutes =require("../routes/supplierRoutes");


const app = express();
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use("/api/sales", salesRoutes);
app.use('/api/supplier',supplierRoutes);
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// Inicio
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Servidor: http://localhost:${PORT}`);
    console.log(`✅ BD: ${process.env.DB_NAME}`);
  });
});