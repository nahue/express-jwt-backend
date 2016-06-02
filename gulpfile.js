var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var Cache = require('gulp-file-cache')

var cache = new Cache();
var jsFiles = ['./src/app.js','./src/**/*.js'];

gulp.task('compile', ['style'], function () {
    var stream = gulp.src(jsFiles) // your ES2015 code
                   //.pipe(cache.filter()) // remember files
                   .pipe(babel({
                        presets: ['es2015']
                    })) // compile new ones
                   //.pipe(cache.cache()) // cache them
                   .pipe(gulp.dest('./dist')); // write them
    return stream // important for gulp-nodemon to wait for completion
})

gulp.task('style', () => {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('serve', ['style'], () => {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', () => {
            console.log('Restarting...');
        });
});

gulp.task('watch', ['compile'], function () {
    var stream = nodemon({
                    env: {
                        'PORT': 3000
                    },
                    delayTime: 1,
                    script: 'dist/app.js', // run ES5 code
                    watch: 'src', // watch ES2015 code
                    tasks: ['compile'] // compile synchronously onChange
                })

    return stream
})
