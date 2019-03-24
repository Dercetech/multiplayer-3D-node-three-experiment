module.exports = function configure(injector) {
  injector.register('expressApp', require('./express-app'));
  injector.register('httpServers', require('./http-servers'));
  injector.register('configureExpressApp', require('./express-config'));
  injector.register('configureRoutes', require('./routes-config'));
  injector.register('configureSocket', require('./socket-config'));
};
