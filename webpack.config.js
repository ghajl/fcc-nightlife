const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const browserConfig = {
  entry: { main: ['babel-polyfill', './src/index.jsx'] },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/barcoordinator/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.DefinePlugin({
      __isBrowser__: 'true',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './index.html',
      filename: 'index.html',
    }),
    new WebpackMd5Hash(),
  ],
  // devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const serverConfig = {
  entry: ['babel-polyfill', './server/createServer.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(process.cwd(), 'server'),
    filename: 'server.js',
    library: 'server',
    libraryTarget: 'commonjs2',
    publicPath: '/server/',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new NodemonPlugin({ script: './server/index.js', watch: path.resolve('./server') }),
    new webpack.DefinePlugin({
      __isBrowser__: 'false',
    }),
  ],
};
module.exports = [browserConfig, serverConfig];
