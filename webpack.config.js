const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'production',
  // mode: 'none',
  target: 'node',
  externals: [nodeExternals()],

  entry: {
    app: ['./src/app.ts']
  },

  output: {
    path: path.resolve(__dirname, 'functions'),
    library: 'ScrapingLibrary',
    libraryTarget: 'umd',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts"]
  }
};

module.exports = config;
