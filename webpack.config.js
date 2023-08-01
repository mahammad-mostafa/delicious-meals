const Path = require('path');
const Html = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    clean: true,
    filename: 'main.js',
    path: Path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }],
  },
  plugins: [new Html({ template: './src/index.html' })],
};