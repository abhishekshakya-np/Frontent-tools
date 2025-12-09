// Import necessary Gulp functions
const { src, dest, watch, series } = require('gulp');
// Import gulp-sass plugin and SASS compiler
const sass = require('gulp-sass')(require('sass'));

// Function to dynamically import 'del' module
async function clean() {
    const del = await import('del');
    return del.deleteSync(['index.css']); // Delete any 'index.css' file in the root directory
}

// Build styles task to compile SCSS to CSS
function buildStyles() {
    return src('index.scss')  // Source the 'index.scss' file from the root directory
        .pipe(sass())         // Compile SCSS to CSS using gulp-sass
        .pipe(dest('css'));   // Output the compiled CSS to the 'css' directory
}

// Watch task to monitor changes in SCSS file and re-run tasks
function watchTask() {
    watch(['index.scss'], series(clean, buildStyles)); // Watch 'index.scss' for changes and run clean and buildStyles tasks sequentially
}

// Default task to run clean, buildStyles, and watchTask sequentially
exports.default = series(clean, buildStyles, watchTask);
