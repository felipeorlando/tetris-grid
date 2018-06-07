const gulp = require('gulp')
const path = require('path')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const csso = require('gulp-csso')

const SASS_INCLUDE_PATHS = [
  path.join(__dirname, 'node_modules', 'bourbon-neat', 'core'),
]

gulp.task('styles', () => {
  return gulp.src('./src/tetris.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: SASS_INCLUDE_PATHS }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'))
})

gulp.task('minify-styles', () => {
  return gulp.src('./dist/tetris.css')
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('default', () => {
  runSequence('styles')
})

gulp.task('build', () => {
  runSequence('styles', 'minify-styles')
})
