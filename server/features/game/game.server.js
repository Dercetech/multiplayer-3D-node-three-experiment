module.exports = function diFactory() {
  const game = {};
  const connexions = [];

  const configureSocket = socket => {};

  const connection = socket => {
    connexions.push(socket);
    socket.on('disconnect', message => disconnect(message, socket));
    console.log(`player ${socket.id} connected, total players: ${connexions.length}`);
  };

  const disconnect = (message, socket) => {
    connexions.splice(connexions.indexOf(socket), 1);
    console.log(`player ${socket.id} disconnected, total players: ${connexions.length}`);
  };

  const socketEventHandlers = {
    on: { connection, disconnect }
  };

  return { configureSocket, socketEventHandlers };
};
