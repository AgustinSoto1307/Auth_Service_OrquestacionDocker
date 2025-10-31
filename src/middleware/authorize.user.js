

export const authorizeUser = async (req, res, next) => {
    try {
        const userIdFromToken = req.user.id.toString();
        const resourceId = req.params.id;
        const userRole = req.user.rol;

        if (!userIdFromToken || !resourceId) {

            return res.status(500).json({ message: "Error interno: Identidad no disponible en la solicitud." });
        }

        //LÓGICA DE AUTORIZACIÓN (El corazón del middleware)

        // A) Autorización para Administradores:
        // Si el usuario es 'admin', tiene acceso total.
        if (userRole === 'admin') {
            return next();
        }

        // B) Autorización para Propietarios (Self-Service):
        // Si el ID del usuario autenticado NO coincide con el ID del recurso:
        // Nota: resourceId debe ser el ID del usuario si la ruta es para modificar el propio perfil (Ej: PUT /users/:id)
        if (userIdFromToken !== resourceId) {
            return res.status(403).json({ message: "Acceso prohibido. No tienes permiso para modificar este recurso." });
        }

        // C) Si es el propietario del recurso O un administrador
        // En este punto, sabemos que el usuario puede continuar:
        next();

    } catch (error) {
        // Error genérico del middleware
        console.error("Error en el middleware de autorización:", error);
        res.status(500).json({ message: "Error interno en el servidor de autorización." });
    }
};