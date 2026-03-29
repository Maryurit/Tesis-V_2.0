const inquilinosService = require('../services/inquilinos.service');
const { success, error } = require('../utils/response');
const { body, validationResult } = require('express-validator');

/**
 * Inquilinos Controller
 * Gestiona la creación y administración de inquilinos
 */
const inquilinosController = {

  createValidation: [
    body('usuarioId').notEmpty().withMessage('El ID del usuario inquilino es obligatorio'),
    body('unidadId').notEmpty().withMessage('El ID de la unidad es obligatorio'),
    body('fechaInicioContrato').isISO8601().withMessage('Fecha de inicio de contrato inválida (usa formato YYYY-MM-DD)'),
    body('fechaFinContrato').isISO8601().withMessage('Fecha de fin de contrato inválida'),
    body('nacionalidad').optional(),
    body('contactoEmergencia').optional(),
    body('telefonoEmergencia').optional()
  ],

  /**
   * Crear nuevo inquilino y asignarlo a una unidad
   */
  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return error(res, 'Datos inválidos', 400, errors.array());
    }

    try {
      const inquilino = await inquilinosService.createInquilino(
        req.body,
        req.body.unidadId,
        req.user.edificioId,
        req.user.id
      );
      return success(res, inquilino, 'Inquilino creado y asignado a la unidad correctamente');
    } catch (err) {
      return error(res, err.message, 400);
    }
  },

  /**
   * Listar todos los inquilinos del edificio
   */
  async listar(req, res) {
    try {
      const inquilinos = await inquilinosService.listarInquilinos(req.user.edificioId);
      return success(res, inquilinos, 'Inquilinos listados correctamente');
    } catch (err) {
      return error(res, err.message);
    }
  },

  /**
   * Actualizar datos del inquilino
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const inquilino = await inquilinosService.updateInquilino(id, req.body, req.user.edificioId, req.user.id);
      return success(res, inquilino, 'Inquilino actualizado correctamente');
    } catch (err) {
      return error(res, err.message, 400);
    }
  },

  /**
   * Finalizar contrato de inquilino
   */
  async finalizarContrato(req, res) {
    try {
      const { id } = req.params;
      const resultado = await inquilinosService.finalizarContrato(id, req.user.edificioId, req.user.id);
      return success(res, resultado, 'Contrato finalizado correctamente');
    } catch (err) {
      return error(res, err.message, 400);
    }
  }
};

module.exports = inquilinosController;