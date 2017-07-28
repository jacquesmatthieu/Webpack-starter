const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const TextPlugin = new ExtractTextPlugin({
  filename: '../css/main.css',
  disable: false,
  allChunks: true}
);

const StyleLint = new StyleLintPlugin({
  configFile: '.stylelintrc',
  quiet: true, // Use webpack performances hints entry instead
  syntax: 'scss',
  failOnError: false,
  emitErrors: false
});

module.exports = {
  entry: {
    app: ['../app/assets/js/main.js']
  },

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, '../dist/assets/js'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc',
            failOnWarning: false,
            failOnError: true,
            emitError: false,
            emitWarning: false
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.jpe?g$|\.svg$|\.png$/i,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.eot|ttf|woff|woff2$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [TextPlugin, StyleLint]
};
