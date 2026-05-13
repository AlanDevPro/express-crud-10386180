const ProductModel = require('../models/product.model');

const getAllProducts = (req, res) => {
  const products = ProductModel.findAll();
  res.json({
    success: true,
    count: products.length,
    data: products,
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  const product = ProductModel.findById(id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' });
  }

  res.json({ success: true, data: product });
};

const createProduct = (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Los campos name y price son obligatorios',
    });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({
      success: false,
      message: 'El precio debe ser un número positivo',
    });
  }

  const product = ProductModel.create({ name: name.trim(), price, stock });
  res.status(201).json({ success: true, data: product });
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  const { name, price, stock } = req.body;

  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({
      success: false,
      message: 'El precio debe ser un número positivo',
    });
  }

  const product = ProductModel.update(id, { name, price, stock });
  if (!product) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' });
  }

  res.json({ success: true, data: product });
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  const deleted = ProductModel.delete(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado' });
  }

  res.json({ success: true, message: `Producto ${id} eliminado correctamente` });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};