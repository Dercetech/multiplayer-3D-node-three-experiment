module.exports = function configure(injector) {
  injector.register('gameServer', require('./game.server'));
};
