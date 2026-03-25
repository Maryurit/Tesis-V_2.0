const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleGuard = require('../middlewares/roles.middleware');

const router = express.Router();

// Solo Propietario puede crear administradores
router.use(authMiddleware);
router.use(roleGuard(['PROPIETARIO']));

router.post('/admin', usuariosController.createAdminValidation, usuariosController.createAdmin);
router.get('/admin', usuariosController.listarAdministradores);
router.put('/admin/:id', usuariosController.updateAdmin);
router.delete('/admin/:id', usuariosController.deleteAdmin);

module.exports = router;