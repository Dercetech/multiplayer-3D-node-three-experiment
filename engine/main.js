// script deferred loading makes this redundant
// document.addEventListener('DOMContentLoaded', () => {
const di = new DI();
di.resolve(function(bootLoader, Game) {
  new Game();
  bootLoader.stop();
});
// });
