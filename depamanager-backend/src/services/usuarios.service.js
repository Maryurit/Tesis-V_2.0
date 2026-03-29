const usuariosRepository = require('../repositories/usuarios.repository');
const rolesRepository = require('../repositories/roles.repository');
const { hashPassword } = require('../utils/password');
const prisma = require('../config/database');   // ← IMPORTANTE: Esta línea faltaba

/**
 * Usuarios Service - Crear y listar Administradores (solo Propietario)
 */
const usuariosService = {

  /**
   * Crear un nuevo Administrador
   */
  async createAdmin(data) {
    const rolAdmin = await rolesRepository.findByName('ADMINISTRADOR');
    if (!rolAdmin) {
      throw new Error('Rol ADMINISTRADOR no encontrado');
    }

    const existe = await usuariosRepository.findByEmail(data.email);
    if (existe) {
      throw new Error('El email ya está registrado');
    }

    const passwordHash = await hashPassword(data.password);

    const nuevoAdmin = await usuariosRepository.createAdmin({
      rolId: rolAdmin.id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      passwordHash,
      dni: data.dni,
      telefono: data.telefono,
      direccion: data.direccion,
      tipoDocumento: data.tipoDocumento || 'DNI'
    });

    return nuevoAdmin;
  },

  /**
   * Listar todos los administradores
   */
  async listarAdministradores() {
    return await prisma.usuario.findMany({
      where: {
        rol: {
          nombre: 'ADMINISTRADOR'
        }
      },
      select: {
        id: true,
        nombres: true,
        apellidos: true,
        email: true,
        dni: true,
        telefono: true,
        activo: true,
        fechaCreacion: true
      },
      orderBy: { fechaCreacion: 'desc' }
    });
  },

    async updateAdmin(id, data) {
    return await administradoresRepository.update(id, data);
  },

  async deleteAdmin(id) {
    return await administradoresRepository.delete(id);
  },

    /**
   * Crear un nuevo usuario con rol INQUILINO (usado por el Administrador)
   */
  async createInquilinoUsuario(data) {
    const rolInquilino = await rolesRepository.findByName('INQUILINO');
    if (!rolInquilino) {
      throw new Error('Rol INQUILINO no encontrado');
    }

    const existe = await usuariosRepository.findByEmail(data.email);
    if (existe) {
      throw new Error('El email ya está registrado');
    }

    const passwordHash = await hashPassword(data.password);

    const nuevoUsuario = await usuariosRepository.createAdmin({  // reutilizamos createAdmin pero con rol INQUILINO
      rolId: rolInquilino.id,
      nombres: data.nombres,
      apellidos: data.apellidos,
      email: data.email,
      passwordHash,
      dni: data.dni,
      telefono: data.telefono,
      direccion: data.direccion,
      tipoDocumento: data.tipoDocumento || 'DNI'
    });

    return nuevoUsuario;
  }
};

module.exports = usuariosService;