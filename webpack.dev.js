const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
        { 
            test: /\.js|jsx$/, 
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                    ]
                }
            }
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.svg$/i,
            use: [{
                loader: 'svg-url-loader',
                options: {
                    limit: 10000,
                }
            }],
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/popup.html',
        filename: 'popup.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
        patterns: [
            { 
                from: 'public',
                globOptions: {
                    ignore: ["**/popup.html"], // exclude popup.html from being copied
                },
            },
        ],
      }),
  ],
}
