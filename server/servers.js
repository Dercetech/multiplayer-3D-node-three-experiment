const http = require('http');
// const https = require('https');
const Promise = require('bluebird');
const SocketIO = require('socket.io');

module.exports = function diFactory(config, expressApp, configureSocket) {
  const httpServer = http.createServer(expressApp);
  const io = SocketIO(httpServer);
  configureSocket(io);

  const servers = { http: httpServer, io };

  const _startHttp = () =>
    new Promise((resolve, reject) => {
      httpServer.listen(config.http.port, config.http.address, () => resolve());
    });

  const start = () => Promise.all([_startHttp()]);
  const stop = () => Promise.all([]);

  const getServers = () => servers;

  return { start, stop, getServers };
};
