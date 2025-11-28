const api = require('./api-service');
const { Frame } = require('@nativescript/core');

function setLoading(page, isLoading) {
  const btn = page.getViewById('registerButton');
  if (!btn) return;

  btn.isEnabled = !isLoading;
  btn.text = isLoading ? 'Création...' : 'Créer le compte';
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

exports.onRegisterTap = async (args) => {
  const page = args.object.page;
  const nameField = page.getViewById('nameField');
  const emailField = page.getViewById('emailField');
  const passwordField = page.getViewById('passwordField');
  const confirmPasswordField = page.getViewById('confirmPasswordField');
  const errorLabel = page.getViewById('errorLabel');

  const full_name = (nameField.text || '').trim();
  const email = (emailField.text || '').trim();
  const password = passwordField.text || '';
  const confirmPassword = confirmPasswordField ? (confirmPasswordField.text || '') : '';

  clearError(page);

  //  Tous les champs
  if (!full_name || !email || !password || !confirmPassword) {
    errorLabel.text = 'Tous les champs sont obligatoires.';
    return;
  }

  // Longueur minimale
  if (password.length < 8) {
    errorLabel.text = 'Le mot de passe doit contenir au moins 8 caractères.';
    return;
  }

  //  Confirmation identique
  if (password !== confirmPassword) {
    errorLabel.text = 'Les mots de passe ne correspondent pas.';
    return;
  }

  setLoading(page, true);

  try {
    await api.register(full_name, email, password);
    //  Inscription OK on va directement sur le profil
    Frame.topmost().navigate('profile-page');
  } catch (err) {
    console.error(err);
    errorLabel.text = err.message || 'Erreur lors de l’inscription.';
  } finally {
    setLoading(page, false);
  }
};

exports.onGoLoginTap = () => {
  Frame.topmost().goBack(); 
};
