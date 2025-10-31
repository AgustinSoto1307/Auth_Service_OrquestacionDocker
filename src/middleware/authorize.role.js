/**
 * Middleware de fábrica que retorna una función que valida el rol del usuario en el token.
 * NOTA: Este middleware debe ejecutarse DESPUÉS de verifyToken.
 * @param {string[] | string} requiredRoles - El rol o un array de roles requeridos.
 */
export const authorizeRole = (requiredRoles) => (req, res, next) => {
    // 1. Unificamos a un array, incluso si solo se pasó un string.
    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    
    // El rol viene del payload del JWT adjuntado por verifyToken
    const userRole = req.user.rol; 

    // 2. Verificación del rol
    if (!userRole) {
        return res.status(403).json({ message: 'No se encontró el rol del usuario en el token.' });
    }

    // 3. Comprobación CRÍTICA: Verifica si el rol del usuario está incluido en la lista de roles permitidos.
    if (!rolesArray.includes(userRole)) {
        // 403 Forbidden: El usuario no tiene el rol correcto.
        const requiredString = rolesArray.join(' o ');
        return res.status(403).json({ message: `Acceso denegado. Se requiere uno de estos roles: ${requiredString}.` });
    }

    // Acceso permitido
    next();
};