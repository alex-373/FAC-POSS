exports.createProduct = async (req, res) => {
  const { supplier_id, ...productData } = req.body;
  try {
    // Verificar que el proveedor exista
    const supplier = await Supplier.findByPk(supplier_id);
    if (!supplier) throw new Error("Proveedor no existe");

    const product = await Product.create({ ...productData, supplier_id });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};