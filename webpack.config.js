const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );
const browserConfig = {
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(),  'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ],
  devtool: 'source-map',
}

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: process.cwd(),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: {
          loader: 'babel-loader', 
        }
      }
    ]
  },
  plugins: [
    new NodemonPlugin(),
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}
module.exports = [browserConfig, serverConfig];