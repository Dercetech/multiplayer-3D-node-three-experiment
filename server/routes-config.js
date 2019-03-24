const express = require('express');

module.exports = function routesFactory(config, fourOhFourHandler) {
  function _createAPIRoute() {
    const api = express.Router();

    api.get('/', (req, res) => res.send('API sends regards'));

    return api;
  }

  function configureRoutes(expressApp) {
    const { public } = config.folders;

    // Static contents
    expressApp.use(
      // "/",
      express.static(public)
    );

    // API
    expressApp.use('/api', _createAPIRoute());

    // Fallback to 404
    expressApp.use(fourOhFourHandler);
  }

  return configureRoutes;
};
