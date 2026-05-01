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
   * Busca usuario por ID
   */
   async findById(id) {
    return await prisma.usuario.findUnique({
      where: { id },
      include: { 
        rol: true,
        administrador: true   // ← Agregado para cargar el edificio
      }
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
  },

  /**
   * Actualizar Admin
   */
  async update(id, data) {
  return await prisma.usuario.update({
    where: { id }, 
    data: {
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      dni: data.dni,
      telefono: data.telefono,
      direccion: data.direccion,
      activo: data.activo
    }
  });
},

  /**
   * Eliminar Admin
   */
  async delete(id) {
    return await prisma.usuario.delete({
      where: { id },
    });
  },
};

module.exports = usuariosRepository;