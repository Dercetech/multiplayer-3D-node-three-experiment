module.exports = function diFactory() {
  const locals = {
    server: null,
    interval: null
  };

  // Level/session data go here...
  let counter = 0;

  // Before judging the "Redux is for front end, Node is meant to be stateless and Redux is not stateless", GFY and:
  // - Aba les enfumeurs/euses
  // - A game loop IS statefull and Redux solves many (, many) cyclic dependencies / heavy coupling situations
  // - Object-oriented is soo 2000's
  // - MV*VM rules on the backend too, bitches!
  // - Jem says so
  const dispatch = ({ type, payload }) => {
    switch (type) {
      case 'START_LOOP': {
        start(payload);
        break;
      }
      default: {
        console.log(`[loop] Ignoring action of type ${type}`);
      }
    }
  };

  // Init the loop with needed entities: server, etc.
  const init = ({ server }) =>
    new Promise((resolve, reject) => {
      locals.server = server;
      resolve();
    }).then(() => locals.server.send({ type: 'LOOP_INIT_COMPLETE' }));

  // Simulate data loading
  const _loadResources = () =>
    new Promise((resolve, reject) => {
      resolve();
    });

  // Start: will need more details like the level, the game session meta, etc.
  const start = () =>
    _loadResources()
      // Level & resources ready
      .then(() => locals.server.send({ type: 'LEVEL_READY' }))
      // Start game logic
      .then(() =>
        setInterval(() => {
          locals.server.send({ type: 'TICK', payload: { counter: counter++ } });
        }, 1000)
      )
      // Keep a reference to the loop
      .then(interval => (locals.interval = interval));

  return { init, start, dispatch };
};
