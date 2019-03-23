module.exports = function configure(injector) {
  injector.register('fourOhFourHandler', require('./404.handler'));
};
