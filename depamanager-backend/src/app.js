const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/error.middleware');

// Rutas
const authRoutes = require('./routes/auth.routes');
const edificiosRoutes = require('./routes/edificios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');   // ← nueva

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/api/auth', authRoutes);

// Rutas protegidas
app.use('/api/edificios', edificiosRoutes);
app.use('/api/usuarios', usuariosRoutes);   // ← nueva

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: '✅ Backend funcionando correctamente' });
});

app.use(errorMiddleware);

module.exports = app;