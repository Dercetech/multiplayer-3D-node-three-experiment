;(function() {
"use strict";

const start = () => {
  // window.___debug.loadingStarted = new Date().getTime();
  // console.log('[boot loader] loading screen started');
};

const stop = () => {
  // window.___debug.loadingStopped = new Date().getTime();
  // console.log('[boot loader] stopping loading screen...');
  // console.log(window.___debug);
};

start();

DI.register('bootLoader', function() {
  return { stop };
});
}());
