const path = require('path');

module.exports = function configure(injector) {
  const env = process.env.CFG_ENV;
  const envFactoryFile = path.join(__dirname, `${env ? env : 'dev'}`);
  injector.register('config', require(envFactoryFile));
};
