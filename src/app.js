const express = require('express');
const productRoutes = require('./routes/product.routes');

const app = express();

// ── Middlewares ──────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Health check (útil para Docker HEALTHCHECK y load balancers) ─
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ── Rutas ────────────────────────────────────────────────────────
app.use('/api/products', productRoutes);

// ── Ruta raíz ───────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Express CRUD API - Limachi Villarroel Alan Nicolás',
    version: '1.0.0',
    endpoints: {
      health:   'GET  /health',
      products: 'GET  /api/products',
    },
  });
});

// ── 404 handler ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.path} no encontrada` });
});

// ── Error handler global ─────────────────────────────────────────
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

module.exports = app;