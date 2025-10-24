// controllers/customerController.js (ESModules)
import { Customer } from '../models/index.js';

// Crear cliente
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar todos los clientes
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// Obtener cliente por ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// Actualizar cliente
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await customer.update(req.body);
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar cliente
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await customer.destroy();
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};