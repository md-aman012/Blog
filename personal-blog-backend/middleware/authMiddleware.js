
const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // A Node.js utility to convert callback-based functions to promise-based
const User = require('../models/userModel'); // Import your User model

// 2. Define the protection middleware function
exports.protect = async (req, res, next) => {
  try {
    // 3. Check if a token exists in the request headers
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // The token is part of the header string "Bearer <token>". We split the string and take the second part.
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      // If no token is found, the user is not logged in.
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.',
      });
    }

    
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.',
      });
    }

  
    req.user = currentUser;

    // Call next() to move to the next middleware in the chain (or the route handler itself).
    next();
  } catch (error) {
    // The catch block will handle errors from jwt.verify (e.g., JsonWebTokenError, TokenExpiredError)
    console.error('AUTH MIDDLEWARE ERROR:', error);
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token or session expired. Please log in again.',
    });
  }
};