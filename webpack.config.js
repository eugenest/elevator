var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var SvgStore = require('webpack-svgstore-plugin');

module.exports = {
  context: __dirname + '/assets',
  entry: [
    './index.js',
    'file?name=../index.html!slm!./index.slim'
  ],
  output: {
    path: __dirname + '/builds',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test:   /\.scss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap',
        include: __dirname + '/assets/scss'
      },
      {
        test:   /\.js$/,
        include: __dirname + '/assets',
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        },
      },
      {
        test: /\.font\.ya?ml$/,
        include: __dirname + '/assets/fonts',
        loader: ExtractTextPlugin.extract('style', 'css!csso!fontgen?embed!json!yaml')
      },
      {
        test:   /\.png$/,
        include: __dirname + '/assets/images',
        loader: 'file',
      },
      {
        test: /\.svg$/,
        include: __dirname + '/assets/images',
        loaders: [
          'svg-sprite?' + JSON.stringify({
            name: '[name]',
            prefixize: true,
          }),
          'svgo-loader?' + JSON.stringify({
            plugins: [
              {removeTitle: true},
              {convertColors: {shorthex: false}},
              {convertPathData: false}
            ]
          })
        ]
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets')
    ]
  },
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 3 versions']
    })];
  },
  csso: {
    restructure: true,
    comments: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      React: 'react',
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: [''] }
    })
  ],
  devServer: {
    hot: true,
  }
};
