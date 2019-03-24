const path = require('path');
const spawn = require('child_process').spawn;

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const config = require('./env/dev')();

gulp.task('engine:scss', () =>
  gulp
    .src('./engine/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:concat', () =>
  gulp
    .src(['engine/**/!(boot)*.js', 'engine/boot.js']) // boot.js better comes at the end of the concatenated file
    .pipe(sourcemaps.init())
    .pipe(concat('game.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:watch', () => {
  gulp.watch('engine/**/*.js', gulp.series(['engine:concat']));
  gulp.watch('engine/**/*.js', gulp.series(['engine:scss']));
});

gulp.task('dev', gulp.parallel(['engine:concat', 'engine:watch']));

gulp.task('serve', done => {
  spawn('node', ['index.js'], { stdio: 'inherit' });
  done();
});

gulp.task('start', gulp.parallel(['dev', 'serve']), done => done());
