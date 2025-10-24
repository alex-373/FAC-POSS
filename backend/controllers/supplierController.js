// backend/controllers/supplierController.js
import { Supplier } from "../models/index.js";
import { Op } from "sequelize";

export const listSuppliers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const size = Math.max(Number(limit) || 10, 1);
    const current = Math.max(Number(page) || 1, 1);
    const offset = (current - 1) * size;

    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { contact: { [Op.iLike]: `%${search}%` } },
            { address: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    const { rows, count } = await Supplier.findAndCountAll({
      where,
      limit: size,
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      data: rows,
      pagination: {
        page: current,
        limit: size,
        total: count,
        pages: Math.ceil(count / size),
      },
    });
  } catch (err) {
    console.error("listSuppliers error:", err);
    res.status(500).json({ error: "Error listando proveedores" });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Proveedor no encontrado" });
    res.json(supplier);
  } catch (err) {
    console.error("getSupplierById error:", err);
    res.status(500).json({ error: "Error obteniendo proveedor" });
  }
};

export const createSupplier = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    const supplier = await Supplier.create({ name, contact, address });
    res.status(201).json(supplier);
  } catch (err) {
    console.error("createSupplier error:", err);
    res.status(500).json({ error: "Error creando proveedor" });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { name, contact, address } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Proveedor no encontrado" });
    await supplier.update({ name, contact, address });
    res.json(supplier);
  } catch (err) {
    console.error("updateSupplier error:", err);
    res.status(500).json({ error: "Error actualizando proveedor" });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Proveedor no encontrado" });
    await supplier.destroy();
    res.json({ message: "Proveedor eliminado" });
  } catch (err) {
    console.error("deleteSupplier error:", err);
    res.status(500).json({ error: "Error eliminando proveedor" });
  }
};