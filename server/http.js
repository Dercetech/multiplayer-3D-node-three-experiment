const http = require('http');
const https = require('https');
const Promise = require('bluebird');
const express = require('express');

module.exports = function diFactory(config, configureExpressApp, configureRoutes) {
  let servers;

  const app = express();
  configureExpressApp(app); // CORS, etc.
  configureRoutes(app);

  const _startHttp = () =>
    new Promise((resolve, reject) => {
      let server = http.createServer(app);
      server.listen(config.http.port, config.http.address, () => resolve(server));
    });

  const start = () =>
    Promise.all([_startHttp()]).then(([httpServer]) => {
      servers = { httpServer };
    });

  const stop = () => Promise.all([]);

  const getServers = () => servers;

  return { start, stop, getServers };
};
