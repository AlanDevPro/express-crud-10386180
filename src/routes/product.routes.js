const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Obtener todos los productos
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Obtener un producto por ID
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto
 * @body    { name: string, price: number, stock?: number }
 */
router.post('/', createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Actualizar un producto existente
 * @body    { name?: string, price?: number, stock?: number }
 */
router.put('/:id', updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Eliminar un producto
 */
router.delete('/:id', deleteProduct);

module.exports = router;