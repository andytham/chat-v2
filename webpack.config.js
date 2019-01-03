const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.(s*)css$/,
        use: [
					{
						loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
				]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif|ico)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            }
        }]
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html',
      open: false
    }
  },
  plugins: [
		new MiniCssExtractPlugin(
      {
        filename: "style.css"
      }
    ),
		new HtmlWebpackPlugin(
			{
				hash: false,
				template: "./index.html"
			}
		)
  ]
};

module.exports = config
