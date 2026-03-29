const prisma = require('../config/database');

/**
 * Auditoría Repository - Registra todas las actividades importantes
 */
const auditoriaRepository = {

  async create(usuarioId, edificioId, accion, descripcion) {
    return await prisma.auditoria.create({
      data: {
        usuarioId,
        edificioId,
        accion,
        descripcion
      }
    });
  },

  async findByEdificio(edificioId) {
    return await prisma.auditoria.findMany({
      where: { edificioId },
      include: {
        usuario: {
          select: { nombres: true, apellidos: true, email: true }
        }
      },
      orderBy: { fecha: 'desc' }
    });
  }
};

module.exports = auditoriaRepository;