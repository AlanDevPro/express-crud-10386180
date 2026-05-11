const request = require('supertest');
const app = require('./app');

describe('CRUD Productos', () => {

  test('GET /products', async () => {
    const res = await request(app).get('/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /products', async () => {
    const res = await request(app)
      .post('/products')
      .send({
        name: 'Teclado',
        price: 100
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Teclado');
  });

});