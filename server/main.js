require('trapezo').resolve(module, main);

function main(config, httpServers, gameServer) {
  console.log('[main] starting server...');
  gameServer
    .start()
    .then(() => console.log(`[main] > game started`))
    .then(() => httpServers.start())
    .then(() => console.log(`[main] > client available on http://${config.http.address}:${config.http.port}`));
}
