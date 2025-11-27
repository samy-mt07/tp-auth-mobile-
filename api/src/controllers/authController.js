const { registerUser, loginUser } = require('../services/authService');

async function register(req, res) {
  try {
    const { full_name, email, password } = req.body;

    const { user, token } = await registerUser({ full_name, email, password });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user,
      token,
    });
  } catch (err) {
    console.error(err);

    if (err.message === 'MISSING_FIELDS') {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    if (err.message === 'PASSWORD_TOO_SHORT') {
      return res.status(400).json({ error: 'Mot de passe trop court (minimum 8 caractères).' });
    }

    if (err.message === 'EMAIL_ALREADY_USED') {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    return res.status(500).json({ error: 'Erreur serveur lors de l’inscription.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    return res.status(200).json({
      message: 'Connexion réussie',
      user,
      token,
    });
  } catch (err) {
    console.error(err);

    if (err.message === 'MISSING_FIELDS') {
      return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
    }

    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    return res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
}

// logOUT

async function logout(req, res) {

  // Avec des JWT : on efface juste cote mobile
  return res.status(200).json({ message: 'Déconnexion réussie (token supprimé côté client)' });
}

module.exports = {
  register,
  login,
  logout,
};