module.exports = function diFactory(gameServer) {
  const configureSocket = io => {
    // io.on('connection', socket => {
    //   // console.log('client connected: ' + socket.id);
    //   const { socketEventHandlers: handler } = gameServer;
    //   handler.on.connection(socket);

    //   socket.on('disconnect', message => {
    //     // console.log('client disconnected: ' + socket.id);
    //   });
    // });

    gameServer.registerIO(io);

    // Other socket matters
    // io.on('connection', socket => {
    // console.log('client connected... ');
    // });
  };

  return configureSocket;
};
