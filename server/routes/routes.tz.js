module.exports = function configure(injector) {
  injector.register('configureRoutes', require('./routes-config'));
};
