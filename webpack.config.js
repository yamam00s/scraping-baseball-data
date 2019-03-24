const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],

  entry: {
    app: ['./src/app.js']
  },

  output: {
    path: path.resolve(__dirname, 'functions'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      }
    ]
  }
};

module.exports = config;
