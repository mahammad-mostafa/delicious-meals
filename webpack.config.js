const Path = require('path');
const Html = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'main.js',
    path: Path.resolve(__dirname, './dist'),
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }, { test: /\.jpg$/i, type: 'asset/resource' }, { test: /\.ttf$/i, type: 'asset/resource' }],
  },
  plugins: [new Html({ template: './src/index.html' })],
};