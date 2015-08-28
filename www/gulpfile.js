var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
//var minifycss = require('gulp-minify-css');
//var concat = require('gulp-concat');
//var rename = require('gulp-rename');
//var gulp = require('gulp-param')(require('gulp'), process.argv);
// See: https://www.npmjs.com/package/gulp-param
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = {
    scss: 'scss/*.scss',
    css: 'css/*.css',
    html: '*.html',
    php: '*.php',
    img: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}']
};

var config = {
    files: ['*.css', '**/*.css'],
    proxy: 'localhost:80',
    host: '192.168.1.222',
    tunnel: true,
    logPrefix: 'SullivanPerkins'
}

// Browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync(config)
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.php).on('change', reload);
});

// Compresses images
gulp.task('images', function() {
    gulp.src(src.img)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images2'));

});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({
            stream: true
        }));
});

// Default task
gulp.task('default', ['browser-sync']);
