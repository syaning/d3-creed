const webpack = require('webpack')

module.exports = {
  entry: {
    'creed': './index.js',
    'creed.min': './index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'creed',
    libraryTarget: 'umd'
  },
  externals: {
    d3: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  watch: true
}
