// middleware/auth.js
const config = require("../config/development");
const jwt = require("jsonwebtoken");

const isChatUser = async (req, ws, next) => {
  try {
    // Assuming the token is passed as a query parameter
    const token = req.url.split('?token=')[1];

    if (!token) {
      ws.close(4001, 'Authentication required');
      return;
    }

    jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        ws.close(4001, {error:err});
      return;
      }
      console.log("connection success")
      ws.user = user.user;
      next(user);
    });   
  } catch (error) {
    console.error('Authentication error:', error);
    ws.close(4000, 'Server error');
  }
};

module.exports = isChatUser;
