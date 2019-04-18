const path = require('path');
const spawn = require('child_process').spawn;

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const iife = require('gulp-iife');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const config = require('./env/dev')();

gulp.task('three:concat', () =>
  gulp
    .src(
      ['three.js', 'inflate.min.js', 'FBXLoader.js', 'OrbitControls.js', 'Detector.js'].map(filename =>
        path.join('three', 'libs', filename)
      )
    )
    .pipe(sourcemaps.init())
    .pipe(concat('three.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(config.folders.public, 'libs')))
);

gulp.task('engine:scss', () =>
  gulp
    .src('./engine/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:libs', () => gulp.src('libs/**/*.js').pipe(gulp.dest(path.join(config.folders.public, 'libs'))));

gulp.task('engine:concat:game', () =>
  gulp
    .src(['engine/**/*.js', '!engine/loading.js'])
    .pipe(sourcemaps.init())
    .pipe(iife())
    .pipe(concat('engine.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.folders.public))
);

gulp.task('engine:concat:loading', () =>
  gulp
    .src('engine/loading.js')
    .pipe(iife())
    .pipe(gulp.dest(config.folders.public))
);
gulp.task('engine:concat', gulp.parallel(['engine:concat:game', 'engine:concat:loading']));

gulp.task('engine:watch', () => {
  gulp.watch('libs/**/*.js', gulp.parallel(['engine:libs']));
  gulp.watch('engine/**/*.js', gulp.parallel(['engine:concat']));
  gulp.watch('engine/**/*.js', gulp.series(['engine:scss']));
  gulp.watch('three/libs/*.js', gulp.series(['three:concat']));
});

gulp.task('dev', gulp.parallel(['engine:concat', 'engine:libs', 'engine:watch', 'three:concat']));

gulp.task('serve', done => {
  spawn('node', ['index.js'], { stdio: 'inherit' });
  done();
});

gulp.task('start', gulp.parallel(['dev', 'serve']), done => done());
