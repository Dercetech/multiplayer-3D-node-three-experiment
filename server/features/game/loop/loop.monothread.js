module.exports = function diFactory(loop) {
  // Submits events by matching IPC interface eg. "forkChild.on('message', ({ type, payload }) => ..."
  const submit = {};

  // Registers a handler for a given event type
  const on = (eventType, eventHandler) => {
    submit[eventType] = eventHandler;
  };

  // Simulates the parent process' channel "forChild.send()
  const send = action => loop.dispatch(action);

  const server = {
    send: action => submit.message(action) // sends an action to parent process
  };

  // Mimics IPCs forked child's interface
  const process = { on, send };

  invoke = () => loop.init({ server }).then(() => server.send({ type: 'PROCESS_READY' }));

  return { process, invoke };
};
