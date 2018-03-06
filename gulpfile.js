const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const LessAutoprefix = require('less-plugin-autoprefix');
const BrowserSync = require('browser-sync').create();

const rename = require('gulp-rename');
const jsmin = require('gulp-uglify-es').default;

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

var lessDir = 'src/assets/less/';

// Tasks: Minify and Compile

gulp.task('html-minify', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('image-minify', () =>
    gulp.src('src/assets/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/image'))
);

gulp.task("js-minify", function(){
    gulp.src('src/assets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('script.min.js'))
        // .pipe(rename('script.min.js'))
        .pipe(jsmin())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(BrowserSync.stream());
});

gulp.task('less', function () {
    gulp.src(lessDir + 'main.less')
        .pipe(rename("main.min.css"))
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix, require('less-plugin-glob')]
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(BrowserSync.stream());
});

// Tasks: Watch, Build and Serve

gulp.task('serve', function () {
    BrowserSync.init({
        server: "dist"
    });
    gulp.watch('src/*.html', ['html-minify']);
    gulp.watch('src/assets/image/*', ['image-minify']);
    gulp.watch('src/assets/js/*.js',['js-minify'])
    gulp.watch(lessDir + '**/*.less', ['less']);
    gulp.watch('dist/*.html').on('change', BrowserSync.reload);
});


// Tasks: Default Build Trigger

gulp.task('default', ['html-minify', 'image-minify', 'js-minify', 'less', 'serve']);