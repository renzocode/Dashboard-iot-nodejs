const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



module.exports = {
	entry : {
		main : './src/index.js',
	},
	output : {
		path : path.join(__dirname, 'dist'),
		publicPath : '/',
		filename : '[name].js'
	},
	target : 'web',
	devtool : '#source-map',
	optimization : {
		minimizer : [
			new UglifyJsPlugin({
				cache : true,
				parellel : true,
				sourceMap : true,
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				exclude : /node_modules/,
				use : {
					loader : "babel-loader"
				}
			},
			{
				test : /\.html$/,
				use : [
					{
						loader : "html-loader",
						options : {minimize: true}
					}
				]
			},
			{
				test : /\.css$/,
				use : [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test : /\.(png|svg|jpg|gif)$/,
				use : [{loader:'url-loader'}]
			}
		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			template : "./src/html/index.html",
			filename: "./index.html"
		}),
		new MiniCssExtractPlugin({
			filename : "[name].css",
			chunkFilename : "[id].css"
		})
	]

}