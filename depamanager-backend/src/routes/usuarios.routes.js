const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { roleGuard } = require('../middlewares/roles.middleware');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// ==================== RUTAS EXCLUSIVAS DEL PROPIETARIO ====================
router.use('/admin', (req, res, next) => {
  roleGuard(['PROPIETARIO'])(req, res, next);
});

// Crear y listar administradores (SOLO Propietario)
router.post('/admin', usuariosController.createAdminValidation, usuariosController.createAdmin);
router.get('/admin', usuariosController.listarAdministradores);

// ==================== RUTAS DEL ADMINISTRADOR ====================

// Listar usuarios inquilinos (solo Administrador)
router.get('/inquilinos-usuarios', (req, res, next) => {
  roleGuard(['ADMINISTRADOR'])(req, res, next);
}, usuariosController.listarUsuariosInquilinos);

// Crear usuario inquilino (solo Administrador)
router.post('/inquilino-usuario', (req, res, next) => {
  roleGuard(['ADMINISTRADOR'])(req, res, next);
}, usuariosController.createInquilinoUsuario);

module.exports = router;