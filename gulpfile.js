const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const replace = require('gulp-replace');

function styles () {
    return gulp.src('./src/styles/*.scss')
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(gulp.dest('./dist/css'));
}

function images () {
    return gulp.src('./src/images/**/*', { encoding: false })
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
}

function comprimeHtml() {
    return gulp.src('./src/*.html')
        .pipe(replace('@@ENDERECO_DO_CSS', './css/main.css')) 
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true })) 
        .pipe(gulp.dest('./dist'));
}

function compilaSass() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sourcemaps.init()) 
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps')) 
        .pipe(gulp.dest('./dist/css'));
}

exports.default = gulp.parallel(styles, images, comprimeHtml, compilaSass);

exports.watch = function(){
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
    gulp.watch('./src/*.html', gulp.parallel(comprimeHtml));
}