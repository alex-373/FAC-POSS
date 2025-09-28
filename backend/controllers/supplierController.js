    // backend/controllers/supplierController.js
    const { Supplier } = require('../models');

    // Crear un nuevo proveedor (método POST)
    exports.createSupplier = async (req, res) => {
      try {
        const newSupplier = await Supplier.create(req.body);
        res.status(201).json(newSupplier);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el proveedor.' });
      }
    };
    