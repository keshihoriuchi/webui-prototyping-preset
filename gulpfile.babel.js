const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const haml = require('gulp-haml');
const browserSync = require('browser-sync').create();

gulp.task('pug', () => {
  return gulp.src("*.pug")
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('.'));
});

gulp.task('haml', () => {
  return gulp.src("*.haml")
  .pipe(plumber())
  .pipe(haml())
  .pipe(gulp.dest('.'));
});

gulp.task('sass', () => {
  return gulp.src("*.scss")
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('.'));
});

gulp.task('serve', ['pug', 'haml', 'sass'], () => {
  browserSync.init({
    server: {
      index: 'index.html'
    }
  });
  gulp.watch('*.pug', ['pug']);
  gulp.watch('*.haml', ['haml']);
  gulp.watch('*.scss', ['sass']);
  gulp.watch('*.css').on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});