import express from "express";
import { createSale, getAllSales } from "../controllers/saleController.js";

const router = express.Router();

// Ruta para crear una venta (POST)
router.post("/", createSale);

// Ruta para obtener todas las ventas (GET)
router.get("/", getAllSales);

export default router;