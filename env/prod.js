const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'data');
  folders.public = path.join(folders.root, 'public');

  const http = {};
  http.port = process.env.PORT || 8086;
  http.address = process.env.IP || '127.0.0.1';

  throw new Error('[ENV > PROD] Missing Firebase API key. Do NOT commit/push yours to a public repo.');

  return { folders, http };
};
