const api = require('./api-service');
const { Frame } = require('@nativescript/core');

function setLoading(page, isLoading) {
  const btn = page.getViewById('loginButton');
  if (!btn) return;

  btn.isEnabled = !isLoading;
  btn.text = isLoading ? 'Connexion...' : 'Se connecter';
}

function clearError(page) {
  const errorLabel = page.getViewById('errorLabel');
  if (errorLabel) {
    errorLabel.text = '';
  }
}

exports.onNavigatingTo = (args) => {
  const page = args.object;
  clearError(page);
  setLoading(page, false);
};

exports.onLoginTap = async (args) => {
  const page = args.object.page;
  const emailField = page.getViewById('emailField');
  const passwordField = page.getViewById('passwordField');
  const errorLabel = page.getViewById('errorLabel');

  const email = (emailField.text || '').trim();
  const password = passwordField.text || '';

  clearError(page);

  if (!email || !password) {
    errorLabel.text = 'Email et mot de passe sont obligatoires.';
    return;
  }

  setLoading(page, true);

  try {
    await api.login(email, password);
    // Connexion ok  on switch sur le profil
    Frame.topmost().navigate('profile-page');
  } catch (err) {
    console.error(err);
    errorLabel.text = err.message || 'Erreur de connexion.';
  } finally {
    setLoading(page, false);
  }
};

//  Bouton "creer un compte"
exports.onGoRegisterTap = () => {
  Frame.topmost().navigate('register-page');
};
