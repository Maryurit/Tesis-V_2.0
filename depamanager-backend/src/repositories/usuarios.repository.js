const prisma = require('../config/database');

/**
 * Usuarios Repository - Respeta TODOS los campos de tu tabla usuarios
 */
const usuariosRepository = {

  /**
   * Crea un nuevo usuario con todos los campos posibles de tu BD
   */
  async create(data) {
    return await prisma.usuario.create({
      data: {
        rolId: data.rolId,
        nombres: data.nombres,
        apellidos: data.apellidos,
        tipoDocumento: data.tipoDocumento || 'DNI',
        dni: data.dni || null,
        email: data.email,
        passwordHash: data.passwordHash,
        telefono: data.telefono || null,
        direccion: data.direccion || null,
        activo: true
      },
      include: {
        rol: true
      }
    });
  },

  /**
   * Busca usuario por email (incluye el rol)
   */
  async findByEmail(email) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: { rol: true }
    });
  },

  /**
   * Busca usuario por ID
   */
  async findById(id) {
    return await prisma.usuario.findUnique({
      where: { id },
      include: { rol: true }
    });
  },

    /**
   * Crea un usuario con rol ADMINISTRADOR (usado por el Propietario)
   */
  async createAdmin(data) {
    return await prisma.usuario.create({
      data: {
        rolId: data.rolId,
        nombres: data.nombres,
        apellidos: data.apellidos,
        tipoDocumento: data.tipoDocumento || 'DNI',
        dni: data.dni || null,
        email: data.email,
        passwordHash: data.passwordHash,
        telefono: data.telefono || null,
        direccion: data.direccion || null,
        activo: true
      },
      include: {
        rol: true
      }
    });
  },

  /**
   * Busca usuario por email (para verificar si ya existe antes de crear admin)
   */
  async findByEmail(email) {
    return await prisma.usuario.findUnique({
      where: { email },
      include: { rol: true }
    });
  }
};

module.exports = usuariosRepository;