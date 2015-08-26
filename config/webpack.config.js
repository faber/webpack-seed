var webpack = require('webpack'),
    path = require('path'),
    root = path.join(__dirname, '..'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    Clean = require('clean-webpack-plugin'),
    DIST = process.env.DIST
;

var options = {
  debug: !DIST
};

var config = {
  context: path.join(root, 'src'),
  entry: ['./Main.js'],
  output: {
    path: path.join(root, (DIST ? 'dist' : 'build')),
    filename: (DIST ? 'bundle.[hash].js' : 'bundle.js')
  },
  resolve: {
    root: [
      path.join(root, 'src'),
      path.join(root, 'styles')
    ]
  },
  module: {
    loaders: [
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        // loader: "style!css" },
      { test: /\.scss$/,
        loader: "style!css!sass?" +
        "includePaths[]=" + path.join(root, 'styles') + '&' +
        'includePaths[]=' + path.join(root, 'node_modules')
      },
      { test: /(\.js|\.jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.(js|jsx)$/, loader: "eslint-loader", exclude: /node_modules/ },
      { test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'url-loader?limit=8192'
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /(\.yml|\.yaml)$/, loader: 'json!yaml' }
    ]
  },
  plugins: [
    new Clean(['build', 'dist'], root),
    new ExtractTextPlugin(DIST ? 'bundle.[hash].css' : 'bundle.css'),
    new HtmlWebpackPlugin({
      title: 'Isotopes',
      minify: DIST,
      hash: DIST,
      template: path.join(root, 'index.html.tpl')
    })
  ],
  debug: options.debug,
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  eslint: {
    configFile: path.join(root, '.eslintrc')
  }
};




module.exports = config;
