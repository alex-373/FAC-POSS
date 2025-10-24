// controllers/saleController.js
import { Sale, SaleDetail, Product, sequelize } from "../models/index.js"; // Asegúrate de exportar sequelize

export const createSale = async (req, res) => {
  const { customer_id, date, products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "Debes enviar al menos un producto" });
  }

  // Validar estructura mínima
  for (const p of products) {
    if (!p.productId || !p.quantity || p.quantity <= 0) {
      return res.status(400).json({ error: "productId y quantity son requeridos y quantity debe ser > 0" });
    }
  }

  const t = await sequelize.transaction();
  try {
    // Crear venta base con total 0
    const sale = await Sale.create(
      { customer_id, date: date || new Date(), total: 0 },
      { transaction: t }
    );

    // Traer todos los productos de una vez y bloquear para actualización
    const productIds = [...new Set(products.map(p => p.productId))];
    const dbProducts = await Product.findAll({
      where: { id: productIds },
      lock: t.LOCK.UPDATE,
      transaction: t,
    });

    if (dbProducts.length !== productIds.length) {
      const foundIds = new Set(dbProducts.map(p => p.id));
      const missing = productIds.filter(id => !foundIds.has(id));
      throw { status: 404, message: `Productos no encontrados: ${missing.join(", ")}` };
    }

    // Index para acceso rápido
    const productMap = new Map(dbProducts.map(p => [p.id, p]));

    // Validar stock
    for (const item of products) {
      const prod = productMap.get(item.productId);
      if (prod.stock < item.quantity) {
        throw { status: 400, message: `Stock insuficiente para ${prod.nombre}. Disponible: ${prod.stock}` };
      }
    }

    // Actualizar stock y crear detalles
    let total = 0;

    for (const item of products) {
      const prod = productMap.get(item.productId);

      prod.stock -= item.quantity;
      await prod.save({ transaction: t });

      // Asegúrate de que product.price es DECIMAL en DB y se devuelve como string si usas mysql2
      const unitPrice = Number(prod.price);
      const subtotal = Number((unitPrice * item.quantity).toFixed(2));
      total = Number((total + subtotal).toFixed(2));

      await SaleDetail.create(
        {
          saleId: sale.id,
          productId: prod.id,
          quantity: item.quantity,
          price: unitPrice,
          subtotal,
        },
        { transaction: t }
      );
    }

    sale.total = total;
    await sale.save({ transaction: t });

    await t.commit();
    return res.status(201).json({ message: "Venta registrada", sale });
  } catch (err) {
    await t.rollback();
    const status = err.status || 500;
    const message = err.message || "Error al registrar venta";
    console.error("createSale error:", err);
    return res.status(status).json({ error: message });
  }
};

export const getAllSales = async (req, res) => {
  try {
    // Si quieres incluir detalles y productos:
    const sales = await Sale.findAll({
      include: [
        {
          model: SaleDetail,
          as: "details",
          include: [{ model: Product, as: "product" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(sales);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};