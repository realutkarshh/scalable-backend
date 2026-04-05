export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Guard: protect middleware must run first and attach req.user
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: requires one of [${allowedRoles.join(", ")}]`,
      });
    }

    next();
  };
};