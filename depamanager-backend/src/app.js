const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/error.middleware');

// Rutas
const authRoutes = require('./routes/auth.routes');
const edificiosRoutes = require('./routes/edificios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const unidadesRoutes = require('./routes/unidades.routes');   // ← Nueva ruta
const inquilinosRoutes = require('./routes/inquilinos.routes');
const vehiculosRoutes = require('./routes/vehiculos.routes');

const app = express();

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/edificios', edificiosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/unidades', unidadesRoutes);   // ← Nueva
app.use('/api/inquilinos', inquilinosRoutes);
app.use('/api/vehiculos', vehiculosRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: '✅ Backend funcionando correctamente' });
});

app.use(errorMiddleware);

module.exports = app;