const { initialData } = require('../config/database');

let products = [...initialData];
let nextId = products.length + 1;

const ProductModel = {
  findAll() {
    return products;
  },

  findById(id) {
    return products.find(p => p.id === id) || null;
  },

  create({ name, price, stock = 0 }) {
    const product = {
      id: nextId++,
      name,
      price,
      stock,
      createdAt: new Date().toISOString(),
    };
    products.push(product);
    return product;
  },

  update(id, { name, price, stock }) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...(name  !== undefined && { name }),
      ...(price !== undefined && { price }),
      ...(stock !== undefined && { stock }),
      updatedAt: new Date().toISOString(),
    };
    return products[index];
  },

  delete(id) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },

  // Usado por los tests para resetear el estado
  _reset() {
    products = [...initialData];
    nextId = products.length + 1;
  },
};

module.exports = ProductModel;