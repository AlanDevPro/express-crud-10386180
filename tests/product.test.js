const request = require('supertest');
const app = require('../src/app');
const ProductModel = require('../src/models/product.model');

// Resetear el estado de la BD en memoria antes de cada test
// eslint-disable-next-line no-undef
beforeEach(() => {
  ProductModel._reset();
});

describe('🛒 CRUD de Productos - API /api/products', () => {

  // ── GET ALL ────────────────────────────────────────────────────
  describe('GET /api/products', () => {
    test('debe retornar 200 con lista de productos', async () => {
      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.count).toBeGreaterThan(0);
    });
  });

  // ── GET BY ID ──────────────────────────────────────────────────
  describe('GET /api/products/:id', () => {
    test('debe retornar un producto existente', async () => {
      const res = await request(app).get('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(1);
    });

    test('debe retornar 404 si el producto no existe', async () => {
      const res = await request(app).get('/api/products/9999');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test('debe retornar 400 si el ID no es un número', async () => {
      const res = await request(app).get('/api/products/abc');

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // ── POST ───────────────────────────────────────────────────────
  describe('POST /api/products', () => {
    test('debe crear un producto y retornar 201', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Monitor', price: 300, stock: 5 });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Monitor');
      expect(res.body.data.price).toBe(300);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('createdAt');
    });

    test('debe retornar 400 si falta el campo name', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ price: 100 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('debe retornar 400 si falta el campo price', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Auriculares' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('debe retornar 400 si el precio es negativo', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Test', price: -10 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  // ── PUT ────────────────────────────────────────────────────────
  describe('PUT /api/products/:id', () => {
    test('debe actualizar un producto existente', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .send({ name: 'Laptop Pro', price: 1500 });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Laptop Pro');
      expect(res.body.data.price).toBe(1500);
      expect(res.body.data).toHaveProperty('updatedAt');
    });

    test('debe retornar 404 al actualizar un producto inexistente', async () => {
      const res = await request(app)
        .put('/api/products/9999')
        .send({ name: 'X', price: 10 });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // ── DELETE ─────────────────────────────────────────────────────
  describe('DELETE /api/products/:id', () => {
    test('debe eliminar un producto existente', async () => {
      const res = await request(app).delete('/api/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      // Verificar que ya no existe
      const check = await request(app).get('/api/products/1');
      expect(check.statusCode).toBe(404);
    });

    test('debe retornar 404 al eliminar un producto inexistente', async () => {
      const res = await request(app).delete('/api/products/9999');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // ── HEALTH CHECK ───────────────────────────────────────────────
  describe('GET /health', () => {
    test('debe retornar status ok', async () => {
      const res = await request(app).get('/health');

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body).toHaveProperty('uptime');
    });
  });

});