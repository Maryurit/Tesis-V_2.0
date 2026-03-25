const express = require('express');
const edificiosController = require('../controllers/edificios.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleGuard = require('../middlewares/roles.middleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleGuard(['PROPIETARIO']));

router.post('/', edificiosController.createValidation, edificiosController.create);
router.get('/', edificiosController.listar);
router.post('/asignar-admin', edificiosController.asignarAdmin);     // nueva
router.get('/accesos', edificiosController.accesosGlobales);         // nueva
router.get('/alertas', edificiosController.alertasGlobales);  
router.post('/upgrade-plan', edificiosController.upgradePlan);   
router.put('/:id', edificiosController.update);
router.delete('/:id', edificiosController.delete);    

module.exports = router;