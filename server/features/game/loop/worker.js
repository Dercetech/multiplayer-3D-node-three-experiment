const gateway = {};

console.log('[loop process] Fresh from the spawning pool!');

process.on('message', action => {
  if (gateway.loop) {
    gateway.loop.dispatch(action);
  } else {
    console.log('[loop process] Message from parent:', action);
  }
});

// This forked process has its own singletons/instances
require('trapezo').resolve(module, function(loop) {
  gateway.loop = loop;

  // Create "server" IPC proxy
  const server = {
    send: action => process.send(action)
  };

  loop.init({ server }).then(() => process.send({ type: 'PROCESS_READY' }));
});
