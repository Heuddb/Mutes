const jwt = require('jsonwebtoken');

// Optional auth - doesn't fail if no token, just sets req.user if valid token exists
const OptionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.id,
      };
    }
    // If no token, req.user remains undefined - that's fine for guests
    next();
  } catch (error) {
    // Invalid token - just continue as guest, don't fail
    console.log('Optional auth check skipped, continuing as guest');
    next();
  }
};

module.exports = OptionalAuth;
