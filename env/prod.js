const path = require('path');

process.env.multiThread = 'yes';

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'data');
  folders.public = path.join(folders.root, 'public');

  const http = {
    port: process.env.PORT || 8086,
    address: process.env.IP || '127.0.0.1'
  };

  const system = {
    multiThread: process.env.multiThread === 'yes'
  };

  throw new Error('[ENV > PROD] Missing Firebase API key. Do NOT commit/push yours to a public repo.');

  return { folders, http, system };
};
