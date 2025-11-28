const { API_BASE_URL } = require('./api-config');
const appSettings = require('@nativescript/core/application-settings');
const httpModule = require('@nativescript/core/http');

const USE_MOCK = false; // on utilise la vraie API

async function apiRequest(path, options = {}) {
  if (USE_MOCK) {
    console.log('MOCK API CALL →', path);
    return mockResponse(path, options);
  }

  const url = API_BASE_URL + path;
  const method = options.method || 'GET';

  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';

  //  on lit le token )
  const token = appSettings.getString('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  console.log('HTTP REQUEST →', method, url, 'token =', token ? 'présent' : 'absent');

  const content = options.body || null;

  try {
    const response = await httpModule.request({
      url,
      method,
      headers,
      content,
    });

    console.log('HTTP RESPONSE STATUS →', response.statusCode);

    let data = {};
    if (response.content) {
      try {
        data = response.content.toJSON();
      } catch (e) {
        console.log('JSON parse error, raw:', response.content.toString());
        data = { raw: response.content.toString() };
      }
    }

    // si la rponse contient un token, on le stocke ici 
    if (data && data.token) {
      console.log(' Sauvegarde du token dans application-settings');
      appSettings.setString('authToken', data.token);
    }

    if (response.statusCode < 200 || response.statusCode >= 300) {
      const err = new Error(data.error || 'Erreur API');
      err.status = response.statusCode;
      throw err;
    }

    return data;
  } catch (e) {
    console.error('HTTP ERROR →', e);
    throw new Error(e.message || 'Erreur réseau');
  }
}

function mockResponse(path, options) {
  return Promise.resolve({});
}

//login
async function login(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

//register
async function register(full_name, email, password) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ full_name, email, password }),
  });
}

//profil
async function getProfile() {
  return apiRequest('/users/me', { method: 'GET' });
}

//logout simple
function logout() {
  appSettings.remove('authToken');
}

module.exports = {
  login,
  register,
  getProfile,
  logout,
};
