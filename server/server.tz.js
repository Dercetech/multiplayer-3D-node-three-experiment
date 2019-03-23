module.exports = function configure(injector) {
  injector.register('httpServers', require('./http'));
  injector.register('configureExpressApp', require('./config/express.config'));
};
