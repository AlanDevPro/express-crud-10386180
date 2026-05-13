// Simulación de base de datos en memoria
// En producción, reemplazar con MongoDB/PostgreSQL

const initialData = [
  { id: 1, name: 'Laptop',  price: 1000, stock: 10, createdAt: new Date().toISOString() },
  { id: 2, name: 'Mouse',   price: 50,   stock: 50, createdAt: new Date().toISOString() },
  { id: 3, name: 'Teclado', price: 80,   stock: 30, createdAt: new Date().toISOString() },
];

module.exports = { initialData };