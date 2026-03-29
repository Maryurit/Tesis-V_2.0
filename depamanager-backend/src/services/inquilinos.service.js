const inquilinosRepository = require('../repositories/inquilinos.repository');
const auditoriaRepository = require('../repositories/auditoria.repository');

/**
 * Inquilinos Service
 */
const inquilinosService = {

  /**
   * Crear nuevo inquilino
   */
  async createInquilino(data, unidadId, edificioId, adminId) {
    const inquilino = await inquilinosRepository.create(data, unidadId);

    // Registrar en auditoría
    await auditoriaRepository.create(
      adminId,
      edificioId,
      'CREAR_INQUILINO',
      `Inquilino ${data.usuarioId} asignado a unidad ${unidadId}`
    );

    return inquilino;
  },

  /**
   * Listar inquilinos del edificio
   */
  async listarInquilinos(edificioId) {
    return await inquilinosRepository.findByEdificio(edificioId);
  },

  /**
   * Actualizar inquilino
   */
  async updateInquilino(id, data, edificioId, adminId) {
    const inquilino = await inquilinosRepository.update(id, data);
    await auditoriaRepository.create(adminId, edificioId, 'ACTUALIZAR_INQUILINO', `Inquilino actualizado`);
    return inquilino;
  },

  /**
   * Finalizar contrato
   */
  async finalizarContrato(id, edificioId, adminId) {
    const inquilino = await inquilinosRepository.finalizarContrato(id);
    await auditoriaRepository.create(adminId, edificioId, 'FINALIZAR_CONTRATO', `Contrato finalizado`);
    return inquilino;
  }
};

module.exports = inquilinosService;