const { verificarToken } = require('../utils/jwt');
const usuariosRepository = require('../repositories/usuarios.repository');

/**
 * Middleware de autenticación JWT mejorado
 * Carga el usuario + edificio si es administrador
 */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No se proporcionó token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verificarToken(token);
    const usuario = await usuariosRepository.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    req.user = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol.nombre
    };

    // Si es administrador, cargamos su edificio
    if (usuario.rol.nombre === 'ADMINISTRADOR' && usuario.administrador) {
      req.user.edificioId = usuario.administrador.edificioId;
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;