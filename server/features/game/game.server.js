const path = require('path');
const { fork } = require('child_process');

module.exports = function diFactory(config, loopMonothread) {
  const game = {
    io: null
  };
  const connexions = [];
  let loopProcess = null;

  // TODO: split in multiple files: state, store, actions, effects, socket handler, loop

  const _onClientConnection = socket => {
    connexions.push(socket);
    socket.on('disconnect', message => _onClientdisconnect(message, socket));
    socket.broadcast.emit('new player', 'blah');
    console.log(`player ${socket.id} connected, total players: ${connexions.length}`);
  };

  const _onClientdisconnect = (message, socket) => {
    connexions.splice(connexions.indexOf(socket), 1);
    console.log(`player ${socket.id} disconnected, total players: ${connexions.length}`);
  };

  const registerIO = io => {
    game.io = io;
    // New client connection
    io.on('connection', clientSocket => {
      _onClientConnection(clientSocket);

      // Client socket events
      clientSocket.on('disconnect', message => {
        _onClientdisconnect(message, clientSocket);
      });
    });
  };

  const start = () =>
    new Promise((resolve, reject) => {
      if (config.system.multiThread) {
        loopProcess = fork(path.join(__dirname, 'loop', 'worker'), [], {
          execArgv: [`--inspect-brk=${process.debugPort + 1}`] // Jem is proud of this one
        });
      } else {
        loopProcess = loopMonothread.process;
      }

      loopProcess.on('exit', (code, signal) => {
        console.log('[game server] Loop exited with ' + `code ${code} and signal ${signal}`);
      });

      loopProcess.on('message', ({ type, payload }) => {
        switch (type) {
          case 'PROCESS_READY': {
            loopProcess.send({ type: 'START_LOOP' });
            break;
          }

          // Loop started and ready
          case 'LOOP_INIT_COMPLETE': {
            console.log(`[game server] Loop ready & registered!`);
            resolve();
            break;
          }

          // Loop started and ready
          case 'LEVEL_READY': {
            console.log(`[game server] Level ready & started ticking`);
            resolve();
            break;
          }

          // Basic IPC test
          case 'TICK': {
            console.log(`[game server] Received test counter value ${payload.counter}`);
            connexions.forEach(socket => socket.emit('tick', payload.counter));
            break;
          }

          default: {
            console.log(`[game server] Received action from loop with unhandled type ${type}`);
          }
        }
      });

      if (config.system.multiThread) {
        // Do nothing, the worker invoke is async, so the .on is guaranteed to have run.
      } else {
        // The monothreaded loop is created synchronously, so a delayed invoke() is necessary.
        loopMonothread.invoke();
      }
    });

  return {
    start,
    registerIO
    //, socketEventHandlers
  };
};
