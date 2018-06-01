const gulp = require('gulp')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('styles', () => {
  return gulp.src('./src/tetris.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('minify-styles', () => {
  return gulp.src('./dist/tetris.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', () => {
  runSequence('styles')
})

gulp.task('build', () => {
  runSequence('styles', 'minify-styles')
})
