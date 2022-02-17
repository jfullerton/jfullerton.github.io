// webpack.mix.js

let config = require('./browsersync-config');
let browserSyncOptions = config.browsersync;

let mix = require('laravel-mix');

mix.disableSuccessNotifications();

mix.sass('./swrpg/scss/crawl.scss', './swrpg/css', {}, [
    require('autoprefixer')
  ])
  .browserSync(browserSyncOptions)
  .sourceMaps(false);
