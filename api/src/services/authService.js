const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/userModel');
const generateToken = require('../utils/generateToken');

async function registerUser({ full_name, email, password }) {
  // validation de base
  if (!full_name || !email || !password) {
    const err = new Error('MISSING_FIELDS');
    throw err;
  }

  if (password.length < 8) {
    const err = new Error('PASSWORD_TOO_SHORT');
    throw err;
  }

  // verifier si l'email existe deja
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    const err = new Error('EMAIL_ALREADY_USED');
    throw err;
  }

  // hash du mot de passe
  const password_hash = await bcrypt.hash(password, 10);

  // Creer l'utilisateur
  const user = await createUser(full_name, email, password_hash);

  // Generer un token JWT pour le nouvel utilisateur
  const token = generateToken(user.id);

  // Ne pas renvoyer le hash
  delete user.password_hash;

  return { user, token };
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    const err = new Error('MISSING_FIELDS');
    throw err;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    const err = new Error('INVALID_CREDENTIALS');
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const err = new Error('INVALID_CREDENTIALS');
    throw err;
  }

  const token = generateToken(user.id);

  delete user.password_hash;

  return { user, token };
}

module.exports = {
  registerUser,
  loginUser,
};
