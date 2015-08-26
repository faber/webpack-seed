var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '..',
    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'spec/*.spec.js',
      'spec/**/*.spec.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'spec/*.spec.js': ['webpack'],
      'spec/**/*.spec.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher",
      "karma-webpack"
    ]
  });
};
