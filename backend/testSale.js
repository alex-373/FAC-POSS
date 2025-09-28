// backend/testSale.js
require("dotenv").config();
const sequelize = require("./config/database");
const { Sale, SaleDetail, Product, Customer } = require("./models");

(async () => {
  try {
    // Conexión a la BD
    await sequelize.authenticate();
    console.log("✅ Conectado a la BD");

    // Creamos una venta de prueba
    const customer_id = 1; // ⚠️ Asegúrate de que exista en tu tabla customers
    const products = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ];

    let total = 0;

    // Crear venta base
    const sale = await Sale.create({ customer_id, date: new Date(), total: 0 });

    for (let item of products) {
      const product = await Product.findByPk(item.productId);
      if (!product) throw new Error(`❌ Producto ${item.productId} no encontrado`);
      if (product.stock < item.quantity) throw new Error(`❌ Stock insuficiente para ${product.nombre}`);

      // Restar stock
      product.stock -= item.quantity;
      await product.save();

      const subtotal = item.quantity * product.price;
      total += subtotal;

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

    console.log("✅ Venta registrada:", sale.toJSON());
    process.exit();
  } catch (err) {
    console.error("❌ Error al registrar venta:", err.message);
    process.exit(1);
  }
})();
