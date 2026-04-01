const express = require('express');
const accesosController = require('../controllers/accesos.controller');

const router = express.Router();

router.post('/registrar', accesosController.registrar);

module.exports = router;