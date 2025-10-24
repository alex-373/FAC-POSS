// backend/app/app.js
import express from "express";
import sequelize from "../config/database.js";
import cors from 'cors';

import authRoutes from "../routes/auth.js";
import productRoutes from "../routes/productRoutes.js";
import customerRoutes from "../routes/customerRoutes.js";
import salesRoutes from "../routes/salesRoutes.js";
import supplierRoutes from "../routes/supplierRoutes.js";

const app = express();

// ✅ 1. CONFIGURAR CORS (ANTES DE TODO)
app.use(cors({
  origin: "http://localhost:3001", // ← URL de tu frontend
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ 2. MIDDLEWARE JSON (después de CORS)
app.use(express.json());

// ✅ 3. LOGGER (después de JSON)
app.use((req, _res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ 4. RUTAS (después de middleware)
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/suppliers", supplierRoutes);

// ✅ 5. HEALTH CHECK
app.get("/health", (_req, res) => res.json({ ok: true }));

// ✅ 6. 404 GENÉRICO (mantener al final)
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.originalUrl}` });
});

// ✅ 7. INICIO DEL SERVIDOR
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`✅ Servidor: http://localhost:${PORT}`);
    console.log(`✅ BD: ${process.env.DB_NAME}`);
  });
});

export default app;
