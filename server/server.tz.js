module.exports = function configure(injector) {
  injector.register('expressApp', require('./express'));
  injector.register('httpServers', require('./servers'));
  injector.register('configureExpressApp', require('./express.config'));
  injector.register('configureRoutes', require('./routes'));
  injector.register('apiRoot', require('./api'));
  injector.register('configureSocket', require('./socket'));
};
