const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var WatchIgnorePlugin = webpack.WatchIgnorePlugin;

module.exports = {
  entry: {
    index: [
      // require.resolve('react-dev-utils/webpackHotDevClient'),
      // require.resolve('./polyfills'),
      // require.resolve('react-error-overlay'),
      './src/index.js',
    ],
  },
  // output: {
  //   path: path.join(__dirname, '/build'), // the bundle output path
  //   filename: 'bundle.js', // the name of the bundle
  // },
  output: {
    path: path.join(__dirname, '/build'),
    pathinfo: true,
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].chunk.js',
    // publicPath: publicPath,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html', // to import index.html file inside index.js
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['index'],
      template: 'src/index.html',
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
    historyApiFallback: {
      disableDotRule: true,
      // 指明哪些路径映射到哪个html
      rewrites: [
        { from: /^\/popup.html/, to: '/build/popup.html' },
        { from: /^\/options.html/, to: '/build/options.html' },
      ]
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        type: 'asset/resource',
      },
    ],
  },
};