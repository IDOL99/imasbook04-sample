const path = require('path');
const webpack = require('webpack');

const KotlinWebpackPlugin = require('@jetbrains/kotlin-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_MODE = process.env.NODE_ENV || 'development';
const isProduction = BUILD_MODE === 'production';

module.exports = {
  mode: BUILD_MODE,
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'kotlinx-html-js': 'kotlinx-html',
    },
  },
  plugins: [
    new KotlinWebpackPlugin({
      src: path.resolve(__dirname, 'src'),
      output: 'build',
      optimize: isProduction,
      moduleName: 'bundlekt', // ビルド時のJSファイル名
      moduleKind: 'commonjs',
      librariesAutoLookup: true,
      verbose: true,
      sourceMap: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.template.html'),
      filename: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};