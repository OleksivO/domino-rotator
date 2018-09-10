const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: resolve(__dirname, 'src', 'app.js'),
  output: {
    filename: 'build.js',
    path: resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlPlugin({ template: resolve(__dirname, 'src', 'index.html') })
  ]
}