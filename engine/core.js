function jem() {
  const di = new TurboHedral();

  di.register('config', function() {
    return {
      unit: 'ms',
      db: 'url'
    };
  });

  di.register('game', function(config) {
    return {
      tick: () => console.log('tick!' + config.unit)
    };
  });

  di.register('db', function(config) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          connect: () => console.log('db:' + config.db)
        });
      }, 2000);
    });
  });

  di.resolve(function(db, game) {
    db.connect();
    game.tick();
  });
}
