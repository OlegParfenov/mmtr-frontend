var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', async function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'src' // Директория для сервера - src
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('sass', async function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function () {
    return gulp.src('src/*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
    return gulp.src('src/js/index.js')
        .pipe(browserSync.reload({ stream: true }))


});


gulp.task('watch', function () {

    gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('code'));
    gulp.watch('src/js/index.js', gulp.parallel('scripts'));

    // Other watchers
})

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));