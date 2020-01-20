const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Для сборки css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//Для сборки js
module.exports = {
  entry: {
    main: ['./src/js/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './public/index.html',
      filename: 'index.html'
    })
  ],
  //Для Live-reload
  devServer: {
    contentBase: __dirname + '/',
    host: 'localhost',
    port: 8080,
    hot: true,
  },
  // watch: true,
};

