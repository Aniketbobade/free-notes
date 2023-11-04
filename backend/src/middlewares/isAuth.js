const config= require("../config/development")
const jwt = require("jsonwebtoken");
const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401).json({ message: "Unauthorized" }); // Unauthorized
  }

  jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: "Forbidden", err }); // Forbidden
    }
    
    req.user = user.user;
    next();
  });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}

module.exports = isAuth;