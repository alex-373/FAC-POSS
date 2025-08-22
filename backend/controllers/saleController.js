// controllers/saleController.js
const { Sale, SaleDetail, Product } = require("../models");

const createSale = async (req, res) => {
  const { customerId, date, products } = req.body;

  try {
    // Crear la venta
    const sale = await Sale.create({ customerId, date, total: 0 });
    let total = 0;

    // Procesar productos
    for (let item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(404).json({ error: "Producto no encontrado" });
      if (product.stock < item.quantity)
        return res.status(400).json({ error: `Stock insuficiente para ${product.nombre}` });

      // Restar stock
      product.stock -= item.quantity;
      await product.save();

      const subtotal = item.quantity * product.price;
      total += subtotal;

      // Guardar detalle
      await SaleDetail.create({
        saleId: sale.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });
    }

    // Actualizar total de la venta
    sale.total = total;
    await sale.save();

    res.status(201).json({ message: "Venta registrada", sale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar venta" });
  }
};

// Función para obtener todas las ventas
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  createSale,
  getAllSales,
};
