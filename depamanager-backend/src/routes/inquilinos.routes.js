const express = require('express');
const inquilinosController = require('../controllers/inquilinos.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { roleGuard, adminEdificioGuard } = require('../middlewares/roles.middleware');

const router = express.Router();

// Requiere autenticación y rol de Administrador
router.use(authMiddleware);
router.use(roleGuard(['ADMINISTRADOR']));
// Solo puede gestionar su propio edificio
router.use(adminEdificioGuard);

router.post('/', inquilinosController.createValidation, inquilinosController.create);
router.get('/', inquilinosController.listar);
router.put('/:id', inquilinosController.update);
router.put('/:id/finalizar', inquilinosController.finalizarContrato);

module.exports = router;