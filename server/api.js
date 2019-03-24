const express = require('express');

module.exports = function routesFactory() {
  const api = express.Router();

  api.get('/', (req, res) => res.send('API sends regards'));

  return api;
};
