import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password) {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

export async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
