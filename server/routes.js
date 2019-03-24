const express = require('express');

module.exports = function routesFactory(config, apiRoot, fourOhFourHandler) {
  function configureRoutes(expressApp) {
    const { public } = config.folders;

    // Static contents
    expressApp.use(
      // "/",
      express.static(public)
    );

    // API
    expressApp.use('/api', apiRoot);

    // Fallback to 404
    expressApp.use(fourOhFourHandler);
  }

  return configureRoutes;
};
