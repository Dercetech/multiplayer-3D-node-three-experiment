module.exports = function diFactory() {
  const configureSocket = io => {
    io.on('connection', socket => {
      console.log('client connected');
      socket.emit('crap', 'aPayload');
    });
  };

  return configureSocket;
};
