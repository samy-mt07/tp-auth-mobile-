

function errorHandler(err, req, res, next) {
  console.error(' !!! ERREUR API :', err);

  // Erreur 
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Erreur generic
  return res.status(500).json({
    error: 'Erreur interne du serveur depuis api/src/middlewares/errorHandler.js.',
    details: err.message
  });
}

module.exports = errorHandler;
