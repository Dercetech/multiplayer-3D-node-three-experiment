const express = require('express');

module.exports = function diFactory(configureExpressApp, configureRoutes) {
  const app = express();
  configureExpressApp(app); // CORS, etc.
  configureRoutes(app);
  return app;
};
