const db = require('../config/db');

// creer un nouvel utilisateur
async function createUser(full_name, email, password_hash) {
  const [result] = await db.query(
    'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
    [full_name, email, password_hash]
  );

  return {
    id: result.insertId,
    full_name,
    email,
    password_hash,
  };
}

// chercher un utilisateur par email
async function getUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
}

// chercher un utilisateur par id
async function getUserById(id) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE id = ? LIMIT 1',
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
