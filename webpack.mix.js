let mix = require('laravel-mix');

mix.js('src/app.js', 'dist').setPublicPath('dist');

mix.postCss('src/app.css', 'dist')