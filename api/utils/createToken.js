const jwt = require("jsonwebtoken");

const createToken = (userId) => {
  return jwt.sign(
    // payload
    {
      userId,
    },
    // secret
    process.env.JWT_SECRET,
    // options
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

module.exports = createToken;
