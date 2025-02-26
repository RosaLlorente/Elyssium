// Importar Gulp y plugins 
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const browserSync = require('browser-sync').create();

// Rutas de archivos
const paths = {
    scss: 'scss/Style.scss',
    css: 'css/'
};

//Compilar y minificar SCSS
function styles() {
    return src(paths.scss)
        .pipe(sass().on('error', sass.logError)) // Compila SCSS a CSS
        .pipe(autoprefixer([postcssPresetEnv({ browsers: 'last 2 versions' })])) 
        .pipe(cleanCSS()) // Minifica el CSS
        .pipe(dest(paths.css)) 
        .pipe(browserSync.stream()); // Recarga el navegador
}

//Vigilar cambios en archivos y actualizar en vivo
function watchFiles() {
    browserSync.init({
        server: './',
        port: 3000
    });
    watch(paths.scss, styles); 
    watch('./*.html').on('change', browserSync.reload); // Recargar HTML
}

//Exportar tareas para ejecutarlas
exports.styles = styles;
exports.watch = watchFiles;
exports.default = series(styles, watchFiles);
