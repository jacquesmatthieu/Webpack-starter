const webpack = require('webpack');

module.exports = {
  entry : '../app/assets/js/main.js',
  output: {
    filename: '../dist/assets/js/bundle.js'
  },
  watch : true
  module : {
    loaders: [
      {
        test: /\.js$/,
        include: '../app/assets/js/main.js',
        loader: 'babel?presets[]=es2015'
      }
    ]
  }
};
