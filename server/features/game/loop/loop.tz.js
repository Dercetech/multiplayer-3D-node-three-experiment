module.exports = function configure(injector) {
  injector.register('loop', require('./loop'));
  if (process.env.multiThread === 'yes') {
    // see worker.js and ../game.server's forking mechanism
    // provide dummy monothread object to satisfy the injector
    injector.register('loopMonothread', () => ({}));
  } else {
    injector.register('loopMonothread', require('./loop.monothread'));
  }
};
