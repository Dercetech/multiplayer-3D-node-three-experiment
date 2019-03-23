module.exports = function routesFactory(config, fourOhFourHandler) {
  const express = require('express');
  const path = require('path');

  function configureRoutes(expressApp) {
    const { public } = config.folders;

    // Static contents
    expressApp.use(
      // "/",
      express.static(config.folders.public)
    );

    // API
    // expressApp.use('/api', apiRoute);

    // Fallback to 404
    expressApp.use(fourOhFourHandler);
  }

  return configureRoutes;
};
