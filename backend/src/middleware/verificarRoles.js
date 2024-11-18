export const isEstudiante = (req, res, next) => {
    if (req.roles && req.roles.includes("estudiante")) {
        return next();
    }
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de estudiante" });
};

export const isProfesor = (req, res, next) => {
    if (req.roles && req.roles.includes("profesor")) {
        return next();
    }
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de profesor" });
};

export const isDirector = (req, res, next) => {
    if (req.roles && req.roles.includes("director")) {
        return next();
    }
    return res.status(403).json({ message: "Acceso denegado: Se requiere rol de director" });
};
