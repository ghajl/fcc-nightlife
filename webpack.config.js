const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(process.cwd(),  'public'),
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        contentBase: './dist',
        
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env', 'react']
                  }
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
              }
        ]
    },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //             template: 'public/index.html', 
    //             inject: 'body' 
    //     })
    //     ]
}

