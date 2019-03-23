const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const config = require('./env/dev')();

gulp.task('engine:concat', () =>
  gulp
    .src('engine/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('engine.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:watch', () => {
  gulp.watch('engine/**/*.js', gulp.series(['engine:concat']));
});

gulp.task('dev', gulp.parallel(['engine:concat', 'engine:watch'], done => done()));
