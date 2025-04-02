require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') }); // One level up from utils/
const jwt = require('jsonwebtoken');

// Log environment variables for debugging
console.log('Environment variables loaded:', {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
});

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.');
}

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = generateToken;