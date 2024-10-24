export const authorizations = (roles) => {
  return (req, res, next) => {
    console.log("Usuario autenticado:", req.user);
    if (!req.user || !roles.includes(req.user.role)) {
      console.log("Acceso denegado. Rol:", req.user ? req.user.role : "No definido");
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
};
