var
    gulp = require( 'gulp' ),
    browserSync = require( 'browser-sync' ),
    $ = require( 'gulp-load-plugins' )( {lazy: true} );

function catchErr(e) {
  console.log(e);
  this.emit('end');
}

gulp.task( 'styles', function () {
    return gulp
        .src( 'src/sass/**/*.{sass,scss}' )
        .pipe( $.sourcemaps.init())
        .pipe( $.sass().on( 'error', $.sass.logError ) )
        .pipe( $.autoprefixer( 'last 4 version' ) )
        .pipe( $.cleanCss() )
        .pipe( gulp.dest( 'dist/css' ) )
        .pipe( browserSync.reload( {stream: true} ) );
} );

gulp.task( 'scripts', function () {
    return gulp
        .src( ['src/js/**/*.js', '!src/js/vendor/**/*.js'] )
        .pipe( $.plumber() )
        .pipe( $.babel( {
            presets: ['env']
        } ) )
        .pipe( $.uglify() )
        .on('error', catchErr)
        .pipe( gulp.dest( 'dist/js' ) )
        .pipe( browserSync.reload( {stream: true} ) );
} );

gulp.task( 'vendorScripts', function () {
    return gulp
        .src( ['src/js/vendor/**/*.js'] )
        .pipe( gulp.dest( 'dist/js/vendor' ) )
        .pipe( browserSync.reload( {stream: true} ) );
} );

// Optimizes the images that exists
gulp.task( 'images', function () {
    return gulp
        .src( 'src/img/**' )
        .pipe( $.changed( 'imgs' ) )
        .pipe( $.imagemin( {
            // Lossless conversion to progressive JPGs
            progressive: true,
            // Interlace GIFs for progressive rendering
            interlaced: true
        } ) )
        .pipe( gulp.dest( 'dist/img' ) )
        .pipe( $.size( {title: 'images'} ) );
} );

gulp.task( 'browser-sync', ['styles', 'scripts'], function () {
    browserSync( {
        open: false,
        server: {
            baseDir: "./",
            injectChanges: true, // this is new
        }
    } );
} );

gulp.task( 'watch', function () {
    // Watch .html files
    gulp.watch( "*.html" ).on( 'change', browserSync.reload );
    // Watch .sass files
    gulp.watch( 'src/sass/**/*.{sass,scss}', ['styles', browserSync.reload] );
    // Watch .js files
    gulp.watch( 'src/js/*.js', ['scripts', browserSync.reload] );
    // Watch .js files
    gulp.watch( 'src/js/vendor/*', ['vendorScripts', browserSync.reload] );
    // Watch image files
    gulp.watch( 'src/images/**/*', ['images', browserSync.reload] );
} );

gulp.task( 'default', function () {
    gulp.start(
        'styles',
        'scripts',
        'vendorScripts',
        'images',
        'browser-sync',
        'watch'
    );
} );
