const express = require("express");
const router = express.Router();
const { Sale } = require("../models");
const saleController = require("../controllers/saleController"); 


// Ejemplo: registrar una venta
router.post("/", (req, res) => {
  const { customerId, total, date } = req.body;

  if (!customerId || !total) {
    return res.status(400).json({ error: "Faltan datos de la venta" });
  }

  res.json({
    message: "✅ Venta registrada correctamente",
    data: { customerId, total, date }
  });
});

// Ejemplo: listar todas las ventas (puedes conectarlo a tu BD luego)
router.get("/", (req, res) => {
  res.json({ message: "📦 Aquí se listarían todas las ventas" });
});
// Ruta para crear una venta (POST)
router.post('/sales', saleController.createSale);

// Ruta para obtener todas las ventas (GET)
router.get('/sales', saleController.getAllSales); // <-- ¡Asegúrate de que esta línea exista!


module.exports = router;
