const path = require('path');

module.exports = function diFactory() {
  const folders = {};
  folders.root = path.join(__dirname, '..');
  folders.data = path.join(folders.root, 'test', 'data-out');
  folders.public = path.join(folders.root, 'public');

  const http = {};
  http.port = process.env.PORT || 8086;
  http.address = process.env.IP || '127.0.0.1';

  return { folders, http };
};
