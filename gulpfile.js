const spawn = require('child_process').spawn;
const gulp = require('gulp');

const config = require('./env/dev')();

// Configure specific tasks
require('./gulp/configure-engine-tasks')({ config });

// Configure global tasks
gulp.task('engine:dev:start', gulp.parallel(['engine:concat', 'engine:watch']));

gulp.task('server:start', done => {
  spawn('node', ['index.js'], { stdio: 'inherit' });
  done();
});

gulp.task('start', gulp.parallel(['engine:dev:start', 'server:start']), done => done());
