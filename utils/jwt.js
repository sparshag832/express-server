import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_EXPIRY = '15m'; 

export function generateToken(payload, expiresIn = DEFAULT_EXPIRY) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}


export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('JWT Verification Failed:', err.message);
    return null;
  }
}
