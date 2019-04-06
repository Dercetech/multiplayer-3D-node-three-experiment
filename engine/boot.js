document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.game = game;

  const socket = io();

  socket.on('new player', data => {
    console.log('new player > ' + data);
  });

  socket.on('tick', data => {
    console.log('tick > ' + data);
  });
});
