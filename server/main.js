require('trapezo').resolve(module, main);

function main(httpServers) {
  httpServers.start().then(() => {
    console.log('[main] server ready (^o^)');
  });
}
