import { Product } from "../models/index.js";

export const createProduct = async (req, res) => {
try {
const product = await Product.create(req.body);
res.status(201).json(product);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

export const getAllProducts = async (req, res) => {
try {
const products = await Product.findAll();
res.json(products);
} catch (error) {
res.status(500).json({ error: "Error al obtener productos" });
}
};

export const getProductById = async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product) {
return res.status(404).json({ error: "Producto no encontrado" });
}
res.json(product);
} catch (error) {
res.status(500).json({ error: "Error al obtener el producto" });
}
};

export const updateProduct = async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product) {
return res.status(404).json({ error: "Producto no encontrado" });
}
await product.update(req.body);
res.json(product);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

export const deleteProduct = async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product) {
return res.status(404).json({ error: "Producto no encontrado" });
}
await product.destroy();
res.json({ message: "Producto eliminado con éxito" });
} catch (error) {
res.status(500).json({ error: "Error al eliminar el producto" });
}
};