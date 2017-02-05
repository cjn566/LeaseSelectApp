var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('nodemon');

var jsFiles = ['*.js', 'src/**/*'];

gulp.task('style', function() {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');


    var wireDepOptions = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../public/'
    };

    var injectSrc = gulp.src(
        [
            './public/css/*.css',
            './public/js/**/*.*'
        ],
        {
            read: false,
            base: './public/'
        }
    );

    return gulp.src('./src/*.html')
        .pipe(wiredep(wireDepOptions))
        .pipe(inject(injectSrc,
            {
                ignorePath: '/public/',
                addRootSlash: false
            }))
        .pipe(gulp.dest('./public'));
});

gulp.task('serve', ['style', 'inject'], function(){
    var options = {
        script: 'server/server/server.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: true
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting.....');
        });
});