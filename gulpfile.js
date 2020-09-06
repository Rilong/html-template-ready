const {src, dest, watch, parallel} = require('gulp')
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')


function browserSyncInit() {
  browserSync.init({
    server: 'src/',
    notify: false
  })
}

function scripts() {
  return src('src/js/**/*.js')
    .pipe(browserSync.stream())
}

function styles() {
  return src('src/**/sass/**/main.sass')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({ grid: 'autoplace' }))
    .pipe(cleanCSS({ level: {1: { specialComments: 0 } }, format: 'beautify' }))
    .pipe(dest('src/css/'))
    .pipe(browserSync.stream())
}

function startWatch() {
  watch('src/**/sass/**/*.sass', styles)
  watch('src/js/**/*.js', scripts)
  watch('src/**/*.html').on('change', browserSync.reload)
}

exports.styles = styles
exports.browsersync = browserSyncInit
exports.default = parallel(browserSyncInit, styles, startWatch)