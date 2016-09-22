const path = require('path');
const ConfigPlugin = require('config-webpack-plugin');

module.exports = {
  entry: './app/App.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint'],
        include: path.join(__dirname, 'app')
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.(png|jpg|)$/,
        loader: 'url-loader?limit=200000'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new ConfigPlugin(['./config.js', './config.dist.js'])
  ]
};
