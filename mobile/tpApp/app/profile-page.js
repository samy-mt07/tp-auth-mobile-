const api = require('./api-service');
const { Frame } = require('@nativescript/core');

exports.onNavigatingTo = async (args) => {
  const page = args.object;
  const nameLabel = page.getViewById('nameLabel');
  const emailLabel = page.getViewById('emailLabel');
  const errorLabel = page.getViewById('errorLabel');

  nameLabel.text = 'Chargement...';
  emailLabel.text = '';
  errorLabel.text = '';

  try {
    const data = await api.getProfile();
    if (data.user) {
      nameLabel.text = data.user.full_name || '(sans nom)';
      emailLabel.text = data.user.email || '(sans email)';
    } else {
      errorLabel.text = 'Impossible de charger le profil.';
    }
  } catch (err) {
    console.error(err);
    errorLabel.text = err.message || 'Erreur de chargement du profil.';
    nameLabel.text = 'Erreur';
  }
};

exports.onLogoutTap = () => {
  api.logout(); // supprime le token côté app

  // Retour à l’écran de login en vidant l’historique
  Frame.topmost().navigate({
    moduleName: 'login-page',
    clearHistory: true,
  });
};
